import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SharedModule } from '../shared/shared.module';
import { ConfigService } from '../shared/config/config.service';
import { KAFKA_NAME } from './kafka.di.tokes';


@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: KAFKA_NAME,
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
    KafkaService,
  ],
  exports: [KafkaService],
})
export class KafkaModule { }
