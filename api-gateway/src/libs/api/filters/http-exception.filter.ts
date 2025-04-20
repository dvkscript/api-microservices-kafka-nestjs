
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ResponseBase } from '../response.base';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const status = exception.getStatus();
        const details = (exception as any)?.options?.description || null ;
        
        if (!(exception instanceof HttpException)) return;
        response.status(status).json(ResponseBase.fail(
            status,
            exception.message,
            details
        ));
    }
}
