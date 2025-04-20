import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class KafkaHeadersInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      if (request) {
        // Gắn headers từ request vào context metadata
        Reflect.defineMetadata('kafka-headers', request.headers, context.getHandler());
      }
      return next.handle();
    }
  }
  