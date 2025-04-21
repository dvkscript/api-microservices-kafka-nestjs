import { Injectable } from '@nestjs/common';
import { KafkaProducer } from '../kafka/kafka.producer';

@Injectable()
export class SttService {
    constructor(
        private readonly kafkaProducer: KafkaProducer,
    ) {}

    async convertSpeechToText(file: Express.Multer.File & { format: string }): Promise<any> {
        return await this.kafkaProducer.generateText(file)
    }
}
