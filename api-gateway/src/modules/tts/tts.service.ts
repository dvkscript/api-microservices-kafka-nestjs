import { Injectable } from '@nestjs/common';
import { KafkaProducer } from '../kafka/kafka.producer';

@Injectable()
export class TtsService {
    constructor(
        private readonly kafkaProducer: KafkaProducer,
    ) {}

    async generateAudio(text: string): Promise<Buffer> {
        const voice = await this.kafkaProducer.generateVoice(text);
        if (!voice) {
            throw new Error('Failed to generate voice');
        }
        return Buffer.from(voice, 'base64');
    }
}
