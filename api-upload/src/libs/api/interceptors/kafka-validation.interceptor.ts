import { CallHandler, ExecutionContext, Injectable, NestInterceptor, BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class KafkaValidationInterceptor<T extends object> implements NestInterceptor {
    constructor(private readonly dto: new (...args: any[]) => T) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const data = context.switchToRpc().getData(); // Lấy payload từ Kafka

        const dtoInstance = plainToInstance(this.dto, data);

        return from(validate(dtoInstance)).pipe(
            switchMap(errors => {

                if (errors.length > 0) {
                    throw new BadRequestException({
                        errors: errors.map(err => ({
                            field: err.property,
                            constraints: err.constraints,
                        })),
                    });
                }
                return next.handle();
            })
        );
    }
}
