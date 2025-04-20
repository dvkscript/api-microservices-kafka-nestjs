import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RequestContextService } from './AppRequestContext';
import { nanoid } from 'nanoid';

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const headers = request?.headers ?? {};
    const requestId = headers['x-request-id'] ?? nanoid(6);
    headers['x-request-id'] = requestId;
    const user = headers["user"] ?? null;

    return new Observable((observer) => {
      RequestContextService.runWithContext(() => {
        RequestContextService.setRequestId(requestId);
        RequestContextService.setHeaders(headers);
        RequestContextService.setUser(user);

        next.handle().subscribe({
          next: (data) => observer.next(data),
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });
      }, { requestId, headers, user, req: request, res: response });
    });
  }
}
