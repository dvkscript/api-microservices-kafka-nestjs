import { Module } from '@nestjs/common';
import { TgService } from './tg.service';
import { TgController } from './tg.controller';
import { HttpModule } from '@nestjs/axios';
import { SharedModule } from '../shared/shared.module';
import { ConfigService } from '../shared/config/config.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [SharedModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        baseURL: config.systemConfig.ollamaApiUrl,
        // timeout: 100000,
      }),
    }),
  ],
  controllers: [TgController],
  providers: [TgService],
  exports: [HttpModule]
})
export class TgModule {}
