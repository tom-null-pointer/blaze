import { json, urlencoded } from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import * as http from 'http';
import { AppRouterRegister } from './routes/app-router-register';
import {errorInterceptorMiddleware} from "./shared/middlewares/error-interceptor.middleware";

export class Server {
  private express: express.Express;
  private port: string;
  private httpServer: http.Server;
  private appRouterRegister: AppRouterRegister;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: 'deny' }));
    this.appRouterRegister = new AppRouterRegister(this.express);
    this.appRouterRegister.registerRoutes()
    this.express.use(errorInterceptorMiddleware);
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `App is running at http://localhost:${this.port} in ${this.express.get('env')} mode.`
        );
        console.log('Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  getHTTPServer(): http.Server {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          console.info('Server Stoped.')
          return resolve();
        });
      }
      return resolve();
    });
  }
}
