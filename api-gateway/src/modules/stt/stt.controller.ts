import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SttService } from './stt.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('speech-to-text')
export class SttController {
  constructor(private readonly sttService: SttService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async convertSpeechToText(
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.sttService.convertSpeechToText(file);
    return result;
  }
}
