import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { logger } from './libs/api/middleware/logger.middleware';
import { ConfigService } from './modules/shared/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  // app.enableCors({
  //   origin: envConfig.system.originUrl, 
  //   credentials: true,
  // });

  // Middleware (Should be before Filters)
  app.use(logger);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const configService = app.get(ConfigService);
  const swaggerConfig = configService.swaggerConfig;

  // Swagger Api
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'Nestjs')
      .setDescription(swaggerConfig.description || 'The nestjs API description')
      .setVersion(swaggerConfig.version || '1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
  }
  app.setGlobalPrefix('api');

  // Static assets
  app.useStaticAssets(join(__dirname, '../public', '/'), {
    prefix: '/',
    setHeaders: (res) => res.set('Cache-Control', 'max-age=2592000'),
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
