import * as CONFIG from './src/common/config';

import { User } from './src/entity/User';
import { Board } from './src/entity/Board';
import { Task } from './src/entity/Task';

export default {
  type: CONFIG.POSTGRES_TYPE,
  host: CONFIG.POSTGRES_HOST,
  port: CONFIG.POSTGRES_PORT,
  username: CONFIG.POSTGRES_USER,
  password: CONFIG.POSTGRES_PASSWORD,
  database: CONFIG.POSTGRES_DB,
  logging: CONFIG.POSTGRES_LOGGING,
  migrationsRun: true,
  synchronize: false,
  entities: [User, Board, Task],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
