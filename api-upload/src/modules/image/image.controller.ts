import { Controller, Get, Param, Res } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { Response } from 'express';

@Controller('image')
export class ImageController {
  constructor(
    private readonly fileService: FilesService,
  ) {}

  @Get(":id")
  async getImage(
    @Res() res: Response,
    @Param('id') id: string, 
  ): Promise<void> {
    const image = await this.fileService.getImage("f84b949d-f360-46c5-a8f2-66c2d08ea83b")

    try {
      const { contentType, data } = await this.fileService.fetchFileAsBuffer(image.url);

      res.setHeader('Content-Type', contentType);
      res.send(Buffer.from(data));
    } catch (error) {
      throw new Error('Error getting image');
    }
  }
}
