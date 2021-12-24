import dotenv from 'dotenv';
import { Logger } from './lib/logger/Logger';

dotenv.config();

const LOGGER_LEVEL = Number(process.env.LOGGER_LEVEL) ?? Logger.LEVEL.INFO;

Logger.createLogger({
  level: LOGGER_LEVEL,
  stackTrace: true,
  transports: [
    new Logger.transports.ConsoleTransport({
      name: 'ConsoleLogger',
      level: Logger.LEVEL.ALL,
      timestamp: true,
      dateTimeFormat: 'YYYY-MM-DD HH:mm:ss:SSS',
    }),
    new Logger.transports.FileTransport({
      name: 'FileLogger',
      level: Logger.LEVEL.ALL,
      filename: './logs/misc.log',
      timestamp: true,
    }),
    new Logger.transports.FileTransport({
      name: 'ErrorLogger',
      level: Logger.LEVEL.ERROR,
      filename: './logs/errors.log',
      timestamp: true,
    }),
  ],
});
