import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { StatusCode } from 'src/libs/exceptions/codes.exception';
import { ResponseBase } from '../response.base';
import { Logger } from 'src/libs/utils/log4js';
import { KafkaContext } from '@nestjs/microservices';

@Injectable()
export class KafkaResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const rpcContext = context.switchToRpc(); // Lấy context của RPC
    const kafkaContext = rpcContext.getContext<KafkaContext>(); // Lấy KafkaContext
    const topic = kafkaContext.getTopic(); // Lấy tên MessagePattern (topic Kafka)

    return next.handle().pipe(
      map((data) => (ResponseBase.success(
        data,
        'success',
      ))),
      catchError((error) => {
        const status = error.getStatus();
        
        const logFormat = ` 
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n  
              Kafka Topic: ${topic}
              OK: ${false}
              Status code: ${status}
              Message: ${error.message}
              Response: ${(error as any).message || error} \n  
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
              `
        Logger.error(logFormat);

        const response = error.getResponse();
        const details = (error as any)?.options?.description || null;
        const errors = response.errors || null;

        return of(ResponseBase.fail(
          error instanceof HttpException ? error.getStatus() : StatusCode.INTERNAL_SERVER_ERROR,
          error.message || 'Internal Server Error',
          details,
          errors
        ));
      }),
    );
  }
}
