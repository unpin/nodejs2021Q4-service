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
  const { method, url, query, body } = req;
  next();
  finished(res, () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    let message = `${chalk.red(method)} ${url} ${chalk.yellow(
      statusCode
    )} ${chalk.green(`${duration}ms`)}`;

    if (Object.keys(query).length > 0) {
      message += ` ${chalk.yellow(`Query:`)} ${chalk.blue(
        JSON.stringify(query)
      )}`;
    }

    if (Object.keys(body).length > 0) {
      message += ` ${chalk.yellow(`Body:`)} ${chalk.blue(
        JSON.stringify(body)
      )}`;
    }
    Logger.info(message);
  });
}
