import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { FilesModule } from '../files/files.module';
import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared/shared.module';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [FilesModule, SharedModule, KafkaModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
