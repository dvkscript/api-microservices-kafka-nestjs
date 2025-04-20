import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '../shared/config/config.service';
import { SEQUELIZE } from './database.di-tokens';
import { FileEntity } from '../files/entities/file.entity';

export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([
                FileEntity,
            ]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];