import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { getRequestLoggingMessage } from '../logging/utils';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const now = Date.now();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const res = host.switchToHttp().getResponse();
    res.on('finish', () => {
      const { method, url, query, body } = host.switchToHttp().getRequest();
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

    const error =
      typeof response === 'string'
        ? {
            message: exceptionResponse,
          }
        : (exceptionResponse as object);
    response.status(status);
    response.send({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
