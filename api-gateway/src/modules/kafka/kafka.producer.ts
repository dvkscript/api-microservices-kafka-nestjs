import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { KAFKA_PRODUCER } from "./kafka.di.tokes";
import { ClientKafka } from "@nestjs/microservices";
import { Logger } from "src/libs/utils/log4js";
import { KafkaStep, KafkaTopic } from "../shared/enum/kafka.enum";
import { firstValueFrom } from "rxjs";
import { KafkaMessageFactory } from "../shared/kafka/kafka-message.factory";
import { CreateFileKafkaDto } from "./dto/create-file.kafka.dto";
import { convertSpeechToTextEntity } from "./entities/generate-text.entity";

@Injectable()
export class KafkaProducer implements OnModuleInit {
  constructor(
    @Inject(KAFKA_PRODUCER) private readonly client: ClientKafka,
  ) { }

  async onModuleInit() {
    Logger.info('🚀 Kafka Client is initializing...');
    this.client.subscribeToResponseOf(KafkaTopic.TTS_VOICE_CREATE);
    this.client.subscribeToResponseOf(KafkaTopic.UPLOAD_FILE_CREATE);
    this.client.subscribeToResponseOf(KafkaTopic.STT_TEXT_CREATE);
    await this.client.connect();
    Logger.info('✅ Kafka Client connected successfully!');
  }

  async sendMessage(topicName: KafkaTopic, step: KafkaStep, data: any) {
    const {
      value,
      topic,
      ...rest
    } = KafkaMessageFactory.createMessage({
      topic: topicName,
      data,
      step,
    })

    // Chuyển đổi tất cả dữ liệu sang chuỗi JSON hợp lệ
    // const serializedValue = JSON.stringify(value, (key, val) =>
    //   Buffer.isBuffer(val) ? val.toString('utf-8') : val
    // );

    return await firstValueFrom(this.client.send(topicName, {
      value,
      ...rest,
    }));
  }

  async createFile(data: CreateFileKafkaDto) {
    return await this.sendMessage(KafkaTopic.UPLOAD_FILE_CREATE, KafkaStep.UPLOAD_FILE, data);
  }

  async generateVoice(text: string): Promise<string> {
    return await this.sendMessage(KafkaTopic.TTS_VOICE_CREATE, KafkaStep.GENERATE_FILE, { text })
  }

  async generateText(file: Express.Multer.File & { format: string }): Promise<convertSpeechToTextEntity | null> {
    const fileBase64 = file.buffer.toString('base64');
    const format = file.format
    
    return await this.sendMessage(KafkaTopic.STT_TEXT_CREATE, KafkaStep.GENERATE_FILE, { audio: fileBase64, format })
  }
}