import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TransformInterceptor } from './libs/api/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './libs/api/filters/any-exception.filter';
import { HttpExceptionFilter } from './libs/api/filters/http-exception.filter';
import { SharedModule } from './modules/shared/shared.module';
import { UploadModule } from './modules/upload/upload.module';
import { ContextInterceptor } from './libs/application/context/ContextInterceptor';
import { KafkaModule } from './modules/kafka/kafka.module';
import { TtsModule } from './modules/tts/tts.module';
import { SttModule } from './modules/stt/stt.module';
import { TgModule } from './modules/tg/tg.module';

@Module({
  imports: [SharedModule, UploadModule, KafkaModule, TtsModule, SttModule, TgModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ContextInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}