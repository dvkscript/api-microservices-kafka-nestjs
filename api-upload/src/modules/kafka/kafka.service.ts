import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_NAME } from './kafka.di.tokes';
import { Logger } from 'src/libs/utils/log4js';

@Injectable()
export class KafkaService implements OnModuleInit {
    constructor(
        @Inject(KAFKA_NAME)
        private readonly kafkaClient: ClientKafka
    ) { }

    async onModuleInit() {
        Logger.info('🚀 Kafka Client is initializing...');
        await this.kafkaClient.connect();
        Logger.info('✅ Kafka Client connected successfully!');
    }

}
