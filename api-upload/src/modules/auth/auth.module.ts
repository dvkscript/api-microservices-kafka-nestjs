import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../shared/config/config.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import envConfig from 'src/configs/env.config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: envConfig.jwt.secret,
    }),
  ],
  providers: [JwtStrategy, ConfigService],
  exports: [JwtStrategy]
})
export class AuthModule { }
