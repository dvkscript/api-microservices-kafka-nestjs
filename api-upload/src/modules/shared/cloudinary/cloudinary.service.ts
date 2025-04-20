import { Inject, Injectable } from "@nestjs/common";
import { CLOUDINARY } from "./cloudinary.di-tokens";
import { AdminAndResourceOptions, UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from "stream";
import { ConfigService } from "../config/config.service";
import { UploadApiOptions } from "cloudinary";

@Injectable()
export class CloudinaryService {
    constructor(
        @Inject(CLOUDINARY)
        private readonly cloudinary = v2,
        private readonly configService: ConfigService
    ) { }

    async uploadImage(file: Express.Multer.File, options?: UploadApiOptions): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
        return new Promise((resolve, reject) => {
            const cloudStream = this.cloudinary.uploader.upload_stream(
                {
                    invalidate: true,
                    resource_type: "image",
                    secure: true,
                    overwrite: true,
                    ...options,
                    folder: `${this.configService.cloudinaryConfig.folderName}${options?.folder ? `/${options.folder}` : ''}`
                },
                (err, result) => {
                    if (err) return reject(err);
                    return resolve(result);
                }
            );

            const buffer = Buffer.isBuffer(file.buffer)
                ? file.buffer 
                : Buffer.from((file.buffer as any).data);

            const str = Readable.from(buffer);
            str.pipe(cloudStream);
        });
    }

    async deleteFileByPublicIds(publicId: string[], options?: AdminAndResourceOptions) {
        return await this.cloudinary.api.delete_resources(publicId, {
            resource_type: "image",
            invalidate: true,
            type: "upload",
            ...options
        })
    }
}