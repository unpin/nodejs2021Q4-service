import fs from 'fs';
import moment from 'moment';
import iTransport from './iTransport';
import { LoggerLevel as LEVEL } from '../LoggerLevel';
import { Logger } from '../Logger';

type FileTransportOptions = {
  name: string;
  level?: number;
  filename?: string;
  timestamp?: boolean;
  dateTimeFormat?: string;
};

const defaultDateTimeFormat = 'YYYY-MM-DD HH:mm:ss:SSS';

export class FileTransport implements iTransport {
  level: number;

  fd?: number;

  filename: string;

  timestamp: boolean;

  dateTimeFormat: string;

  /**
   * Returns an instance of the FileTransport class.
   *
   * @param options - options object {@link FileTransportOptions}
   * @throws Error if file cannot be opened
   *
   */

  constructor(options: FileTransportOptions) {
    const { level, filename } = options;
    this.level = level ?? LEVEL.INFO;
    this.filename = filename || 'logging.log';
    this.timestamp = options.timestamp || false;
    this.dateTimeFormat = options.dateTimeFormat || defaultDateTimeFormat;
    this.fd = this.openFile();
  }

  /**
   * Logs the message to file with the given level of severity.
   *
   * @param level - error level
   * @param message - string message to log
   *
   */

  log(level: number, message: string): void {
    if (level > this.level) return;
    const timestamp = this.timestamp
      ? `${moment().format(this.dateTimeFormat || defaultDateTimeFormat)} `
      : '';
    if (this.fd) {
      fs.writeFile(
        this.fd,
        `${timestamp}[${LEVEL[level]}] ${message}\n`,
        (err) => {
          if (err) throw err;
        }
      );
    }
  }

  /**
   * Opens the file and returns the file descriptor.
   *
   * @param filename - name of the file to open
   * @returns file descriptor
   * @throws Error if file cannot be opened
   *
   */
  openFile(): number | undefined {
    try {
      return fs.openSync(this.filename, 'a');
    } catch (error) {
      Logger.error(`Error opening file ${this.filename}: ${error}`);
      throw error;
    }
  }
}
