import { FileStorageType } from "src/modules/shared/enum/storageType.file";
import { FileEntity } from "../entities/file.entity";

export class FindImageQueryDto {
    id: string;
    name: string;
    url: string;
    userId: string;
    objectId: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(image: FileEntity, baseUrl: string) {
        this.id = image.id;
        this.name = image.name;
        this.url = image.storageType === FileStorageType.cloudinary ? `${baseUrl}/${image.url}.${image.format}` : image.url;
        this.userId = image.userId;
        this.objectId = image.objectId;
        this.createdAt = image.createdAt;
        this.updatedAt = image.updatedAt;
    }
}