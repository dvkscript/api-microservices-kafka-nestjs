import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { isUUID } from 'class-validator';
import * as multer from 'multer';
import { Observable } from "rxjs";

export function validateFileImage(file: any) {
    if (!file) {
        throw new BadRequestException('No file uploaded!');
    }

    if (!file.mimetype || !file.mimetype.startsWith('image/')) {
        throw new BadRequestException('Only images are allowed!');
    }

    if (!file.fieldname || !isUUID(file.fieldname)) {
        throw new BadRequestException('Invalid UUID!');
    }

    return {
        ...file,
        filename: file.originalname,
    };
}


@Injectable()
export class FileImageInterceptor implements NestInterceptor {
    private multerInterceptor: NestInterceptor;

    constructor() {
        this.multerInterceptor = new (AnyFilesInterceptor({
            storage: multer.memoryStorage(),
            limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB mỗi file
            fileFilter: (req, file, cb) => {
                if (!file.mimetype.startsWith('image/')) {
                    return cb(new BadRequestException('Only images are allowed!'), false);
                }
                cb(null, true);
            },
        }))();
    }

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();

        await this.multerInterceptor.intercept(context, next);

        request.file = validateFileImage(request.files?.[0]);

        return next.handle()
    }
}