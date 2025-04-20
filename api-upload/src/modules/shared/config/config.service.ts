import { Injectable } from '@nestjs/common';
import envConfig from 'src/configs/env.config';

@Injectable()
export class ConfigService {
    get sequelizeOrmConfig() {
        return envConfig.db;
    }

    get systemConfig() {
        return envConfig.system;
    }

    get cloudinaryConfig() {
        return envConfig.cloudinary;
    }

    get jwtConfig() {
        return envConfig.jwt;
    }

    get kafkaConfig() {
        return envConfig.kafka
    }
}