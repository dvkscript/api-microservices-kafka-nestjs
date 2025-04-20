import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from 'src/modules/shared/config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.jwtConfig.secret,
        });
    }

    async validate(payload: any) {
        if (!payload || !payload.userId) {
            throw new UnauthorizedException('Invalid token');
        }
        return {
            id: payload.userId,
        };
    }
}
