import { Injectable } from '@nestjs/common';
import envConfig from 'src/configs/env.config';

@Injectable()
export class ConfigService {
    get systemConfig() {
        return envConfig.system;
    }

    // get cloudinaryConfig() {
    //     return envConfig.cloudinary;
    // }

    get jwtConfig() {
        return envConfig.jwt;
    }

    get kafkaConfig() {
        return envConfig.kafka
    }

    get swaggerConfig() {
        return {
            enabled: true,
            title: 'Microservice',
            description: 'API Gateway Microservice',
            version: '1.0',
            path: 'api',
        }
    }
}