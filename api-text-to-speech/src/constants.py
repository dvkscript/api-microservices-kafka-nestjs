import os

KAFKA_TTS_TOPIC = 'tts.voice.create'

KAFKA_BROKERS = os.getenv("KAFKA_BROKERS", "localhost:9092").split(",")
KAFKA_CONSUMER_GROUP = os.getenv("KAFKA_CONSUMER_GROUP", "tts-consumer")
KAFKA_CLIENT_ID = os.getenv("KAFKA_CLIENT_ID", "tts-client")
