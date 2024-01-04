import {injectable} from "inversify";
import Router from "express-promise-router";
import {Route} from "./route";
import {RouteInterface} from "../interfaces/route.interface";
import {Request, Response} from "express";
import {HttpSuccessResponse} from "../../shared/responses/http-success.response";

@injectable()
export class RouteBase implements RouteInterface {
  private readonly router;
  private routes: Route[] = []
  constructor() {
    this.router = Router();
  }

  protected setRoutes(routes: Route[]) {
    this.routes = routes;
  }

  private register() {
    this.routes.forEach(route => {
      this.router[route.method](route.path, async (req: Request, res: Response, next: Function) => {
        const returnValue = await route.action(req, res, next)
        const httpResponse = new HttpSuccessResponse(res.statusCode, returnValue);
        return res.send(httpResponse);
      });
    })
  }
  getRouter() {
    this.register();
    return this.router;
  }
}