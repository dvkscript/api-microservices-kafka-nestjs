import { v2 } from 'cloudinary';
import { CLOUDINARY } from './cloudinary.di-tokens';
import { ConfigService } from '../config/config.service';
export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: async (configService: ConfigService) => {
    v2.config({
      cloud_name: configService.cloudinaryConfig.cloudName,
      api_key: configService.cloudinaryConfig.apiKey,
      api_secret: configService.cloudinaryConfig.apiSecret,
    });

    return v2;
  },
  inject: [ConfigService],
};