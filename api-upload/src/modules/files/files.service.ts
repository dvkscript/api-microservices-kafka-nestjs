import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FileRepository } from './repositories/file.repository';
import { FILE_REPOSITORY } from './file.di-tokens';
import { CreateFileImageDto } from './dto/create-file.image.dto';
import { DatabaseOptionType } from '../database/database.types';
import { groupBy } from 'src/libs/utils';
import { FileStorageType } from '../shared/enum/storageType.file';
import { CloudinaryService } from '../shared/cloudinary/cloudinary.service';
import { FileType } from '../shared/enum/type.file';
import { ImageNotFoundException } from './file.errors';
import { ConfigService } from '../shared/config/config.service';
import { FindImageQueryDto } from './dto/find-image.query.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class FilesService {
    constructor(
        @Inject(FILE_REPOSITORY) private readonly fileRepo: FileRepository,
        private readonly cloudinary: CloudinaryService,
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) { }

    async createImage(file: CreateFileImageDto, options?: DatabaseOptionType) {
        return await this.fileRepo.create(file, {
            transaction: options?.transaction
        });
    }

    async deleteFiles(id: string[]) {
        const files = await this.fileRepo.findAll({
            where: {
                id
            }
        });

        if (files?.length < 1) {
            throw new NotFoundException();
        }

        const data = groupBy(files, (f) => f.storageType);

        const cloudinaryFiles = data[FileStorageType.cloudinary];
        const urlFiles = data[FileStorageType.url];

        if (cloudinaryFiles.length > 0) {
            const publicIds = cloudinaryFiles.map((f) => f.url);
            const deleteCloudinary = await this.cloudinary.deleteFileByPublicIds(publicIds);
            if (!deleteCloudinary?.deleted) {
                throw new Error('Delete cloudinary failed');
            }
        };

        const res = await this.fileRepo.delete({
            id
        });
        return res;
    }

    async getImage(id: string) {
        const image = await this.fileRepo.findOne({
            id,
            type: FileType.IMAGE,
        });

        if (!image) {
            throw new ImageNotFoundException();
        }

        return new FindImageQueryDto(image, this.configService.cloudinaryConfig.apiUrl);
    }

    async fetchFileAsBuffer(url: string): Promise<{ data: Buffer; contentType: string }> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(url, { responseType: 'arraybuffer' })
            );
    
            if (!response.data) {
                throw new NotFoundException('File not found');
            }
    
            const contentType = response.headers['content-type'] || 'application/octet-stream';
    
            return {
                data: Buffer.from(response.data),
                contentType,
            };
        } catch (error) {
            throw new Error('Failed to fetch file');
        }
    }
}
