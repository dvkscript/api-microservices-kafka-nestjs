import { FileStorageType } from "src/modules/shared/enum/storageType.file";

export class ImageQueryDto {
    id: string;
    name: string;
    url: string;
    userId: string;
    objectId: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(image: ImageQueryDto & { storageType: string }, baseUrl: string) {
        this.id = image.id;
        this.name = image.name;
        this.url = image.storageType === FileStorageType.cloudinary ? `${baseUrl}/${image.url}` : image.url;
        this.userId = image.userId;
        this.objectId = image.objectId;
        this.createdAt = image.createdAt;
        this.updatedAt = image.updatedAt;
    }
}