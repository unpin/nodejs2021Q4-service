const Koa = require('koa');
const json = require('koa-bodyparser');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = new Koa();

app.use(
  json({
    onerror(err, ctx) {
      ctx.throw('Could not parse request data, invalid JSON.', 400);
    },
  })
);

app.use(async (ctx, next) => {
  await next();
  ctx.set('Content-Type', 'application/json');
});

app.use(userRouter.routes());
app.use(boardRouter.routes());
app.use(taskRouter.routes());

module.exports = app;
