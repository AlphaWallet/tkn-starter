// Please don't move the following dd initialization code
// it has to happen before any import/require statements
// to guarantee auto instumentation
import './tracer';

import {migrate} from 'drizzle-orm/node-postgres/migrator';
import path from 'path';
import {controllers, securityRules} from './controllers';
import {env} from './env';
import {Application} from './_core/application';
import {DbService} from './_core/services/dbService';

const app = new Application()
  .pgOpts({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
  })
  .controllers(controllers)
  .securityRules(securityRules);

const dbService: DbService = app.resolve('dbService');
migrate(dbService.db(), {migrationsFolder: path.resolve('drizzle')})
  .then(() => {
    app.start(env.FASTIFY_PORT, env.FASTIFY_ADDRESS);
  })
  .catch(console.error);
