// src/common/interceptors/audio.interceptor.ts
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { loadEsm } from 'load-esm';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';


const AUDIO_MIME_TO_EXT: Record<string, string> = {
    'audio/mpeg': 'mp3',
    'audio/wave': 'wav',
    'audio/wav': 'wav',
    'audio/flac': 'flac',
    'audio/ogg': 'ogg',
    'audio/aac': 'aac',
};

function getAudioExtensionFromMime(mimeType: string): string | null {
    return AUDIO_MIME_TO_EXT[mimeType] || null;
}

@Injectable()
export class FileAudioInterceptor implements NestInterceptor {
    private multerInterceptor: NestInterceptor;

    constructor() {
        this.multerInterceptor = new (FileInterceptor("audio",{
            storage: multer.memoryStorage(),
            // limits: { fileSize: 5 * 1024 * 1024 }, 
        }))();
    }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();

        await this.multerInterceptor.intercept(context, next);

        const file: Express.Multer.File = request.file;

        if (!file || !file.buffer) {
            throw new BadRequestException('No file uploaded');
        }

        const { fileTypeFromBuffer } = await loadEsm<typeof import('file-type')>('file-type');

        const fileType = await fileTypeFromBuffer(file.buffer);

        if (!fileType?.mime) {
            throw new BadRequestException('Could not determine file type');
        }

        const extension = getAudioExtensionFromMime(fileType.mime);

        if (!extension) {
            throw new BadRequestException(`Unsupported audio format: ${fileType.mime}`);
        }

        // Gắn thêm key `type` vào file
        (file as any).format = extension;

        return next.handle();
    }
}
