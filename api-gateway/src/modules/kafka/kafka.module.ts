import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SharedModule } from '../shared/shared.module';
import { ConfigService } from '../shared/config/config.service';
import { KAFKA_PRODUCER } from './kafka.di.tokes';
import { KafkaProducer } from './kafka.producer';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: KAFKA_PRODUCER,
        imports: [SharedModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.kafkaConfig.clientId,
              brokers: configService.kafkaConfig.brokers,
            },
            consumer: {
              groupId: configService.kafkaConfig.consumerGroup,
            },
          },
        }),
      },
    ]),
  ],
  providers: [
    KafkaProducer
  ],
  exports: [KafkaProducer]
})
export class KafkaModule {}
