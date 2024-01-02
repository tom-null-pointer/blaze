import 'reflect-metadata';
import './shared/utils/config/dotenv-init';
import { App } from './app';
import { PGDatasource } from './datasources/pg.datasource';
import {container} from "./dependency-injection/container";
import {ApiFootballUpdateTeamsAndMatchesCron} from "./core/football-data-source/infra/cronjobs/api-football-update-teams-and-matches.cron";

export const pgDatasource = new PGDatasource();

try {
  const apiFootballTeamsCron = container.get(ApiFootballUpdateTeamsAndMatchesCron);
  new App({
    datasources: [pgDatasource],
    cronJobs: [apiFootballTeamsCron],
  }).start()
} catch (e) {
  console.error('Error Initializing App', e);
  process.exit(1);
}

process.on('uncaughtException', err => {
  console.error('Uncaught Process Exception:', err);
  process.exit(1);
});
