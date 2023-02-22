import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => {
        if (
          Object.keys(data).includes('data') ||
          Object.keys(data).includes('error') ||
          Object.keys(data).includes('meta')
        ) {
          return data;
        }

        return {
          data,
        };
      }),
    );
  }
}
