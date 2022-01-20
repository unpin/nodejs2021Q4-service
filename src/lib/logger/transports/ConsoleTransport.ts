import moment from 'moment';
import { LoggerLevel as LEVEL } from '../LoggerLevel';
import iTransport from './iTransport';
import { getTheme } from '../ColorTheme';

type ConsoleTransportOptions = {
  name: string;
  level?: number;
  timestamp?: boolean;
  dateTimeFormat?: string;
};

const defaultDateTimeFormat = 'HH:mm:ss.SSS';

export class ConsoleTransport implements iTransport {
  name: string;

  level: number;

  timestamp: boolean;

  dateTimeFormat: string;

  /**
   * Returns an instance of the ConsoleTransport class.
   *
   * @param options - options object {@link ConsoleTransportOptions}
   *
   */
  constructor(options: ConsoleTransportOptions) {
    const { name, level, timestamp, dateTimeFormat } = options;
    this.name = name;
    this.level = level ?? LEVEL.INFO;
    this.timestamp = timestamp || false;
    this.dateTimeFormat = dateTimeFormat || defaultDateTimeFormat;
  }

  /**
   * Logs the message to console with the given level of severity.
   *
   * @param level - error level
   * @param message - string message to log
   *
   */
  log(level: LEVEL, message: string): void {
    if (level > this.level) return;
    const timestamp = this.timestamp
      ? `${moment().format(this.dateTimeFormat || defaultDateTimeFormat)} `
      : '';
    const color = getTheme(level);
    const severity = color(`[${LEVEL[level]}]`);
    if (level === LEVEL.ERROR) {
      process.stderr.write(`${timestamp}${severity} - ${message}\n`);
    } else {
      process.stdout.write(`${timestamp}${severity} - ${message}\n`);
    }
  }
}
