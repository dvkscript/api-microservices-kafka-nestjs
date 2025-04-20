import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { isUUID } from 'class-validator';
import * as multer from 'multer';
import { map, Observable } from "rxjs";

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

        // Kiểm tra có file nào không
        if (!request.files || Object.keys(request.files).length === 0) {
            throw new BadRequestException('No file uploaded!');
        }
        
        const files = request.files;
        if (files.length !== 1) {
            throw new BadRequestException('Only one file field is allowed!');
        }

        const file = files[0];
        const fieldname = file.fieldname;
        
        if (!isUUID(fieldname)) {
            throw new BadRequestException('Invalid UUID!');
        }

        delete request.files;
        request.file = {
            ...file,
            filename: file.originalname,
        };

        return next.handle()
    }
}