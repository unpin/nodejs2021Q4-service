import 'reflect-metadata';
import express, { Express } from 'express';
import './setupLogger';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import authRouter from './resources/auth/auth.router';
import loggerMiddleware from './middleware/loggerMiddleware';
import { Logger } from './lib/logger/Logger';

const app: Express = express();

process.on('uncaughtException', handleUncaughtError);
process.on('unhandledRejection', handleUncaughtError);

app.use(express.json());
app.use(loggerMiddleware);

app.use(userRouter);
app.use(boardRouter);
app.use(taskRouter);
app.use(authRouter);

function handleUncaughtError(error: unknown): void {
  if (error instanceof Error) {
    Logger.error(error);
  } else {
    Logger.error(JSON.stringify(error));
  }
  process.exit(1);
}

export default app;
