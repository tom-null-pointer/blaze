import {Request, Response} from "express";
import {HttpMethods} from "../../shared/enums/http-methods.enum";

export class Route {
  method: HttpMethods;
  path: string;
  action: (req: Request, res: Response, next: Function) => Promise<any>;


  constructor(method: HttpMethods, path: string, action: (req: Request, res: Response, next: Function) => any) {
    this.method = method;
    this.path = path;
    this.action = action;
  }
}