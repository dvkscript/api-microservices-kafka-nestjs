import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { logger } from './libs/api/middleware/logger.middleware';
import * as express from 'express'
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import envConfig from './configs/env.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: envConfig.kafka.brokers,
      },
      consumer: {
        groupId: envConfig.kafka.consumerGroup,
        allowAutoTopicCreation: true,
      },
    },
  });

  await app.startAllMicroservices();

  // app.enableCors({
  //   origin: envConfig.system.originUrl, 
  //   credentials: true,
  // });

  // Middleware (Should be before Filters)
  app.use(logger);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.setGlobalPrefix('api');

  // Static assets
  app.useStaticAssets(join(__dirname, '../public', '/'), {
    prefix: '/',
    setHeaders: (res) => res.set('Cache-Control', 'max-age=2592000'),
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
