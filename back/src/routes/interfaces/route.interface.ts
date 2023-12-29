import { Router } from "express"

export interface RouteInterface {
    getRouter: () => Router;
}