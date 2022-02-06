import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { getRequestLoggingMessage } from '../logging/utils';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();

        let response = res;
        if (process.env.USE_FASTIFY === 'true') {
          response = res.raw;
        }

        response.on('finish', () => {
          const { method, url, query, body } = req;
          const duration = `${Date.now() - now}ms`;
          const message = getRequestLoggingMessage({
            method,
            url,
            query,
            body,
            statusCode: res.statusCode,
            duration,
          });
          Logger.verbose(message);
        });
      }),
    );
  }
}
