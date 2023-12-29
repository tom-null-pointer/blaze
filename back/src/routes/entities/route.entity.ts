import {Request, Response} from "express";

export class Route {
  method: ('get' | 'put' | 'patch' | 'post');
  path: string;
  action: (req: Request, res: Response, next: Function) => Promise<any>;


  constructor(method: "get" | "put" | "patch" | "post", path: string, action: (req: Request, res: Response, next: Function) => any) {
    this.method = method;
    this.path = path;
    this.action = action;
  }
}