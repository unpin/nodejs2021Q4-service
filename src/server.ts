import { PORT } from './common/config';
import app from './app';
import { Logger } from './lib/logger/Logger';

app.listen(PORT, () =>
  Logger.info(`App is running on http://localhost:${PORT}`)
);
