import { ConsoleTransport } from './transports/ConsoleTransport';
import { FileTransport } from './transports/FileTransport';
import iTransport from './transports/iTransport';
import { LoggerLevel } from './LoggerLevel';

type LoggerOptions = {
  level: LoggerLevel;
  transports: iTransport[];
  stackTrace?: boolean;
};

export class Logger {
  static INSTANCE: Logger | null = null;

  level: LoggerLevel;

  transports: iTransport[];

  stackTrace: boolean;

  /**
   * Creates an instance of Logger
   *
   * @param options - {@link LoggerOptions}
   *
   */
  constructor(options: LoggerOptions) {
    this.level = options.level || LoggerLevel.ERROR;
    this.transports = options.transports || [];
    this.stackTrace = options.stackTrace || false;
  }

  /**
   * Creates an instance of Logger if it doesn't exist
   * and assigns it to the INSTANCE property.
   *
   * @param options - {@link LoggerOptions}
   *
   */
  static createLogger(options: LoggerOptions): Logger {
    if (!Logger.INSTANCE) {
      Logger.INSTANCE = new Logger(options);
      return Logger.INSTANCE;
    }
    return Logger.INSTANCE;
  }

  /**
   * Logs the message to console with the given level of severity.
   *
   * @param level - {@link LoggerLevel} error level
   * @param error - instance of Error or string message to log
   *
   * @throws Error if Logger instance is not initialized
   *
   */
  static log(level: LoggerLevel, error: string | Error): void {
    if (!Logger.INSTANCE) throw new Error('Logger instance not initialized');
    if (level > Logger.INSTANCE.level) return;
    Logger.INSTANCE.transports.forEach((transport) => {
      if (error instanceof Error) {
        if (this.INSTANCE?.stackTrace && error.stack) {
          transport.log(level, error.stack);
        } else {
          transport.log(level, error.message);
        }
      } else {
        transport.log(level, error);
      }
    });
  }

  /**
   * Logs the message to console with the ERROR level of severity.
   *
   * @param message - instance of Error or string message to log
   *
   */
  static error(message: string | Error): void {
    Logger.log(LoggerLevel.ERROR, message);
  }

  /**
   * Logs the message to console with the WARN level of severity.
   *
   * @param message - instance of Error or string message to log
   *
   */
  static warn(message: string | Error): void {
    Logger.log(LoggerLevel.WARN, message);
  }

  /**
   * Logs the message to console with the INFO level of severity.
   *
   * @param message - instance of Error or string message to log
   *
   */
  static info(message: string | Error): void {
    Logger.log(LoggerLevel.INFO, message);
  }

  /**
   * Logs the message to console with the DEBUG level of severity.
   *
   * @param message - instance of Error or string message to log
   *
   */
  static debug(message: string | Error): void {
    Logger.log(LoggerLevel.DEBUG, message);
  }

  /**
   * Logs the message to console with the ALL level of severity.
   *
   * @param message - instance of Error or string message to log
   *
   */
  static all(message: string | Error): void {
    Logger.log(LoggerLevel.ALL, message);
  }

  static LEVEL = LoggerLevel;

  static transports = {
    ConsoleTransport,
    FileTransport,
  };
}
