import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { FilesModule } from '../files/files.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [FilesModule, SharedModule],
  controllers: [ImageController],
  providers: [],
})
export class ImageModule {}
