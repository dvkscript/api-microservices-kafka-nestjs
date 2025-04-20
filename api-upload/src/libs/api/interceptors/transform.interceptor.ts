import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
  } from '@nestjs/common'
  import { Observable } from 'rxjs'
  import { map } from 'rxjs/operators'
  import { Logger } from '../../utils/log4js'
import { ResponseBase } from '../response.base'
  
  @Injectable()
  export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const req = context.getArgByIndex(1).req
      return next.handle().pipe(
        map(data => {
          const res = ResponseBase.success(
            data,
            "success"
          );
          const logFormat = ` 
          <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n
            Request original url: ${req.originalUrl}
            Method: ${req.method}
            IP: ${req.ip}
            User: ${JSON.stringify(req.user)}
            Response data:\n ${JSON.stringify(res)} \n
          <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`
          Logger.info(logFormat);
          Logger.access(logFormat);

          return res;
        })
      )
    }
  }