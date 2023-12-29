import 'reflect-metadata';
import './shared/utils/config/dotenv-init';
import { App } from './app';
import { PGDatasource } from './datasources/pg.datasource';

export const pgDatasource = new PGDatasource();

try {
  new App({
    datasources: [pgDatasource],
    cronJobs: [],
  }).start()
} catch (e) {
  console.error('Error Initializing App', e);
  process.exit(1);
}

process.on('uncaughtException', err => {
  console.error('Uncaught Process Exception:', err);
  process.exit(1);
});
