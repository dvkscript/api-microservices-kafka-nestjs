import { Body, Controller, Post, StreamableFile } from '@nestjs/common';
import { TtsService } from './tts.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('text-to-speech')
export class TtsController {
  constructor(
    private readonly ttsService: TtsService,
  ) { }

  @Post()
  @ApiResponse({ status: 201, description: 'Voice Generated' })
  @ApiResponse({ status: 200, description: 'Voice Generated' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async textToSpeech(@Body() body: { text: string }) {
    const text = body.text;
    const audio = await this.ttsService.generateAudio(text);

    return new StreamableFile(audio, {
      type: 'audio/wav',
      disposition: 'inline; filename="audio.wav"',
      length: audio.length,
    });
  }
}
