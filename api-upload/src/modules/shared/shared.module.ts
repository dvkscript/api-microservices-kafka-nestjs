import { Module } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    CloudinaryModule,
    HttpModule.register({
      timeout: 5000, // Giới hạn thời gian request
      maxRedirects: 5, // Giới hạn số lần redirect
    }),
  ],
  providers: [ConfigService, CloudinaryService],
  exports: [ConfigService, CloudinaryService, HttpModule]
})
export class SharedModule { }
