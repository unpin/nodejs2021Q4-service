import express, { Express } from 'express';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

const app: Express = express();

app.use(express.json());

app.use(userRouter);
app.use(boardRouter);
app.use(taskRouter);

export default app;
