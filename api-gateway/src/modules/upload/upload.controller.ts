import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
// import { KafkaService } from '../kafka/kafka.service';
import { FileImageInterceptor } from 'src/libs/api/interceptors/fille-image.interceptor';

@Controller('upload')
export class UploadController {
  constructor( 
    private readonly uploadService: UploadService,
  ) {}

  // @Post()
  // @UseInterceptors(FileImageInterceptor)
  // async processImage(
  //   @UploadedFile() image: Express.Multer.File,
  // ) {
  //   const data = {
  //     userId: "8358cbb6-6054-4cb3-aac2-fa43bef988aa",
  //     image,
  //   }
    
  //   return data;
  // }
}
