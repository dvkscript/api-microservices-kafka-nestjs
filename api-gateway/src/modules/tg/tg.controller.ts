import { Body, Controller, Post } from '@nestjs/common';
import { TgService } from './tg.service';

@Controller('text-generation')
export class TgController {
  constructor(private readonly tgService: TgService) {}

  @Post()
  generate(@Body() body: { text: string }) {
    return this.tgService.generateMessage(body.text);
  }
}
