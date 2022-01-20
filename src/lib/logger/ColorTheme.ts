import chalk from 'chalk';
import { LoggerLevel as LEVEL } from './LoggerLevel';

const error = chalk.red;
const warning = chalk.yellow;
const info = chalk.blue;
const debug = chalk.cyan;

/**
 * Returns a function that logs a message with the collor
 * that matches severity level.
 *
 * @param level - severity level
 * @returns function that logs a message with the collor
 *
 */

export function getTheme(level: LEVEL): (string: string) => string {
  switch (level) {
    case LEVEL.ERROR:
      return error;
    case LEVEL.WARN:
      return warning;
    case LEVEL.INFO:
      return info;
    case LEVEL.DEBUG:
      return debug;
    default:
      return (string: string) => string;
  }
}
