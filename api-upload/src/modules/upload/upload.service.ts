import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../shared/cloudinary/cloudinary.service';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseService } from '../database/database.service';
import { InvalidServerErrorException } from 'src/libs/exceptions/http-errors.exception';
import { FilesService } from '../files/files.service';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '../shared/config/config.service';
import { FileStorageType } from '../shared/enum/storageType.file';

@Injectable()
export class UploadService {
    constructor(
        private readonly cloudinary: CloudinaryService,
        private readonly databaseService: DatabaseService,
        private readonly filesService: FilesService,
        private readonly configService: ConfigService,
    ) { }

    async uploadFile(file: Express.Multer.File, userId: string, objectId: string) {
        return await this.databaseService.transaction(async (transaction) => {
            const publicId = uuid();
            const urlPathname = `${this.configService.cloudinaryConfig.folderName}/${publicId}`;
            const fileName = file.originalname;
            const fileSize = file.size;
            const [type, format] = file.mimetype.split("/");
            
            const fileCreate = await this.filesService.createImage({
                name: fileName,
                userId,
                url: urlPathname,
                storageType: FileStorageType.cloudinary,
                objectId,
                size: fileSize,
                format,
                type
            }, {
                transaction
            });
            
            if (!fileCreate) {
                throw new InvalidServerErrorException("Create file to database fail!");
            }
            
            const cloudinaryCreated = await this.cloudinary.uploadImage(file, {
                resource_type: "image",
                public_id: publicId
            });

            if (!cloudinaryCreated?.public_id) {
                throw new InvalidServerErrorException("Upload file to cloud fail!");
            }

            return fileCreate;
        });
    }

    async uploadUrl() {

    }
}
