import { Module, ValidationPipe } from '@nestjs/common';
import { SharedModule } from './modules/shared/shared.module';
import { UploadModule } from './modules/upload/upload.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './libs/api/filters/http-exception.filter';
import { FilesModule } from './modules/files/files.module';
import { AllExceptionsFilter } from './libs/api/filters/any-exception.filter';
import { TransformInterceptor } from './libs/api/interceptors/transform.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { ImageModule } from './modules/image/image.module';
import { KafkaModule } from './modules/kafka/kafka.module';

@Module({
  imports: [SharedModule, UploadModule, FilesModule, AuthModule, ImageModule, KafkaModule],
  providers: [
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
