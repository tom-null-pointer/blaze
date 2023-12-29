import express from 'express';
import glob from 'glob';
import { container } from '../dependency-injection/container';
import { RouteInterface } from './interfaces/route.interface';


export class AppRouterRegister {
  private express: express.Express;

  constructor(express: express.Express) { 
    this.express = express;
  }
  
  registerRoutes() {
    const routesPaths = this.getRoutesPaths()
    routesPaths.forEach(routePath => {
      const routeModule = require(routePath);
      const routeInstance = container.get<RouteInterface>(routeModule.default.name)
      this.express.use(routeInstance.getRouter());
    });
  }

  private getRoutesPaths() {
    return glob.sync(__dirname + '/**/*.route.*');
  }
}
