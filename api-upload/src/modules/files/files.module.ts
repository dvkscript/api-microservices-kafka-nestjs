import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FILE_REPOSITORY } from './file.di-tokens';
import { FileRepository } from './repositories/file.repository';
import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared/shared.module';
import { DatabaseService } from '../database/database.service';

const providers = [
  {
    provide: FILE_REPOSITORY,
    useClass: FileRepository
  }
]

@Module({
  imports: [DatabaseModule, SharedModule],
  controllers: [],
  providers: [
    ...providers,
    FilesService,
    DatabaseService,
  ],
  exports: [
    FilesService,
    DatabaseService,
  ]
})
export class FilesModule { }
