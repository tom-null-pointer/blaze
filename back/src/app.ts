import { Server } from './server';
import path from 'path';
import { DataSource } from 'typeorm';
import {ICronJob} from "./shared/cron-job/interfaces/cron-job.interface";

export class App {
  private server: Server;

  private port: string;

  private datasources: DataSource[];

  private cronJobs: ICronJob[];

  constructor({datasources, cronJobs}: {datasources: DataSource[], cronJobs?: ICronJob[]}) {
    this.datasources = datasources;
    this.cronJobs = cronJobs;
  }
  
  async start(): Promise<void> {
    this.initializePort();
    await this.initializeDatasources();
    this.initializeCronjobs();
    await this.initializeServer();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    await this.server?.stop();
  }
  private initializePort() {
    this.port = process.env.PORT || '5000';
  }

  private async initializeDatasources() {
    if (!this.datasources) {
      console.log('No data sources defined for initialization.')
    }
    for (let datasource of this.datasources) {
      try {
        await datasource.initialize()
        console.log(`Datasource ${datasource.constructor.name} initialized.`)
      } catch (e) {
        console.error(`Datasource ${datasource.constructor.name} failed to initialize.`, e)
      }
    }
  }

  private async initializeServer() {
    this.server = new Server(this.port);
    await this.server.listen();
  }

  static resolveEnvPath(): string {
    return path.join(process.cwd(), `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`);
  }

  private initializeCronjobs() {
    this.cronJobs.forEach(cronJob => cronJob.set())
  }
}
