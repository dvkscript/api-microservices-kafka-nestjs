import asyncio
import json
from aiokafka import AIOKafkaConsumer, AIOKafkaProducer
import constants as c
from stt_service import SpeechToText, log_error, log_info
import base64
import signal
import subprocess

shutdown_event = asyncio.Event()

def handle_shutdown_signal(*_):
    log_info("Shutdown signal received.")
    shutdown_event.set()

async def consume_messages(consumer, producer, stt: SpeechToText):
    async for msg in consumer:
        headers_dict = dict(msg.headers)

        replyTopic = headers_dict.get("kafka_replyTopic").decode('utf-8')
        replyPartition = int(headers_dict.get("kafka_replyPartition").decode('utf-8'))
        key = msg.key.decode('utf-8') if msg.key is not None else None
        timestamp = int(msg.timestamp)
        headers_list = [(k, v) for k, v in headers_dict.items()]
        value = msg.value.decode('utf-8')
        result = None

        try:
            data = json.loads(value)

            audio_str = data.get("audio", None)
            format = data.get("format", None)
            language = data.get("language", None)

            if audio_str:
                text, error = stt.generate(audio_str, format, language)
                if text:
                    try:
                        result = json.dumps(text).encode("utf-8")
                    except json.JSONDecodeError:
                        result = text.encode("utf-8")
                else:
                    log_error(error)

            await producer.send(
                replyTopic,
                result,
                key.encode('utf-8'),
                replyPartition,
                timestamp,
                headers_list
            )
        except Exception as e:
            log_error(str(e))

async def main():
    signal.signal(signal.SIGINT, handle_shutdown_signal)   # Ctrl+C
    signal.signal(signal.SIGTERM, handle_shutdown_signal)  # docker stop

    stt = SpeechToText()
    stt.load_model()
    consumer = AIOKafkaConsumer(
        c.KAFKA_TTS_TOPIC,
        bootstrap_servers=c.KAFKA_BROKERS,
        group_id=c.KAFKA_CONSUMER_GROUP,
        enable_auto_commit=True
    )
    producer = AIOKafkaProducer(
        bootstrap_servers=c.KAFKA_BROKERS,
        value_serializer=lambda v: v
    )

    await consumer.start()
    await producer.start()

    print("✅ Started consumer and producer...")

    consumer_task = asyncio.create_task(consume_messages(consumer, producer, stt))
    shutdown_task = asyncio.create_task(shutdown_event.wait())

    done, pending = await asyncio.wait(
        [consumer_task, shutdown_task],
        return_when=asyncio.FIRST_COMPLETED,
    )

    for task in pending:
        task.cancel()

    log_info("Stopping services...")
    try:
        await consumer.stop()
        await producer.stop()
        stt.unload_model()
        log_info("Graceful shutdown complete.")
    except Exception as e:
        log_error(f"Error during shutdown: {e}")


if __name__ == "__main__":
    asyncio.run(main())
