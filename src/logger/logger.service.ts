import * as fs from 'fs';
import { join } from 'path';
import {
  ConsoleLogger,
  Injectable,
  LoggerService,
  LogLevel,
} from '@nestjs/common';

const LOGGING_DIRECTORY = './logs';
const LOG_FILENAME = 'error.log';

@Injectable()
export class FileLogger extends ConsoleLogger implements LoggerService {
  private readonly fd: number;
  constructor() {
    const level = process.env.LOGGER_LEVEL;
    const logLevels = level.split(',') as LogLevel[];
    super(FileLogger.name, { logLevels });
    if (!fs.existsSync(LOGGING_DIRECTORY)) {
      fs.mkdirSync(LOGGING_DIRECTORY, { recursive: true });
    }
    this.fd = fs.openSync(join(LOGGING_DIRECTORY, LOG_FILENAME), 'a');
  }

  log(message: string | Error) {
    if (message instanceof Error) {
      super.log(message.stack);
    } else {
      super.log(message);
    }
  }

  error(message: string | Error) {
    if (message instanceof Error) {
      super.error(message.stack);
      fs.writeSync(this.fd, this.appendDate(message.stack));
    } else {
      super.error(message);
      fs.writeSync(this.fd, this.appendDate(message));
    }
  }

  warn(message: string | Error) {
    if (message instanceof Error) {
      super.warn(message.stack);
    } else {
      super.warn(message);
    }
  }

  debug(message: string | Error) {
    if (message instanceof Error) {
      super.debug(message.stack);
    } else {
      super.debug(message);
    }
  }

  verbose(message: string | Error) {
    if (message instanceof Error) {
      super.verbose(message.stack);
    } else {
      super.verbose(message);
    }
  }

  private appendDate(message: string) {
    const now = new Date();
    return `${now.toISOString()}: ${message}\n`;
  }
}
