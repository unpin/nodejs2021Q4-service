import { finished } from 'stream';
import { NextFunction, Request, Response } from 'express';
import chalk from 'chalk';
import { Logger } from '../lib/logger/Logger';

export default function httpLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const start = Date.now();
  const { method, url, query } = req;
  next();
  finished(res, () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    const message = `${chalk.red(method)} ${url} ${chalk.yellow(
      statusCode
    )} ${chalk.green(duration)}ms Body: ${JSON.stringify(
      req.body
    )} Query: ${JSON.stringify(query)}`;
    Logger.info(message);
  });
}
