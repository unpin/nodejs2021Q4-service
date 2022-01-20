import { Request, Response } from 'express';
import HTTP_STATUS from '../common/constants';
import SchemaValidationError from '../database/error/SchemaValidationError';
import { Logger } from '../lib/logger/Logger';

export function httpErrorHandler(
  _: Request,
  response: Response,
  error: unknown
): void {
  if (error instanceof SchemaValidationError) {
    response.status(HTTP_STATUS.BAD_REQUEST);
    response.send({ message: error.message });
    Logger.info(error.message);
  } else if (error instanceof Error) {
    Logger.error(error);
    response.status(HTTP_STATUS.INTERNAL_ERROR);
    response.end();
  } else {
    Logger.error(JSON.stringify(error));
    response.status(HTTP_STATUS.INTERNAL_ERROR);
    response.end();
  }
}
