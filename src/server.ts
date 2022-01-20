import 'reflect-metadata';
import { PORT } from './common/config';
import app from './app';
import { Logger } from './lib/logger/Logger';
import { connect } from './database/connection';

connect()
  .then(() => {
    Logger.info('Connected to the database');
    app.listen(PORT, () =>
      Logger.info(`App is running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    Logger.error('Failed to connect to the database');
    Logger.error(error);
    process.exit(1);
  });
