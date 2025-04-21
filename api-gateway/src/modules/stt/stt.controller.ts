import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SttService } from './stt.service';
import { FileAudioInterceptor } from 'src/libs/api/interceptors/file-audio.interceptor';


@Controller('speech-to-text')
export class SttController {
  constructor(private readonly sttService: SttService) {}

  @Post()
  @UseInterceptors(FileAudioInterceptor)
  async convertSpeechToText(
    @UploadedFile() file: Express.Multer.File & { format: string },
  ) {
    const result = await this.sttService.convertSpeechToText(file);
    return result;
  }
}
