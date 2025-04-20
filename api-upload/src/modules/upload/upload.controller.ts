import { Controller, Headers, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiTags } from '@nestjs/swagger';
import { KafkaService } from '../kafka/kafka.service';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaResponseInterceptor } from 'src/libs/api/interceptors/kafka-response.interceptor';
import { KAFKA_UPLOAD_IMAGE_CREATE } from '../kafka/kafka.message-patterns';
import { UploadImageDto } from './dto/upload-image.dto';
import { KafkaValidationInterceptor } from 'src/libs/api/interceptors/kafka-validation.interceptor';

@Controller('upload')
@ApiTags("upload")
// @UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly kafkaService: KafkaService
  ) { }

  // @Post()
  // @UseInterceptors(FileImageInterceptor)
  // async upload(
  //   @Req() req: any,
  //   @UploadedFile() file: Express.Multer.File
  // ) {
  //   const userId = req.user?.id;
  //   const objectId = file.fieldname;

  //   const res = await this.uploadService.uploadFile(file, userId, objectId);
  //   return res
  // }

  // @Post("test")
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log('📤 Upload thành công:', file.originalname);

  //   // Gửi event Kafka
  //   await this.kafkaService.sendMessage('upload.events', file.originalname);

  //   return { message: 'File uploaded successfully' };
  // }

  // @UseInterceptors(new KafkaValidationInterceptor(UploadImageDto))
  // @UseInterceptors(KafkaResponseInterceptor)
  @MessagePattern(KAFKA_UPLOAD_IMAGE_CREATE)
  async handleImageProcessing(@Payload() data: any, @Ctx() context: KafkaContext) {
    const headers = context.getMessage().headers;
  
  console.log('Headers:', headers);
    
    return data
    // const userId = data.userId;
    // const image = data.image
    // const objectId = image.fieldname;

    // const res = await this.uploadService.uploadFile(image, userId, objectId);
    // return res
  }
  
}
