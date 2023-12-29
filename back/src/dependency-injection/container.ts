import { Container } from "inversify";
import {RouteBase} from "../routes/entities/route-base";
import {CronJob} from "../shared/cron-job/entities/cron-job.entity";

export const container = new Container();
// Routers:
container.bind<RouteBase>(RouteBase.name).to(RouteBase);


// Controllers:


// Crons:
container.bind<CronJob>(CronJob).toSelf();


// Services:


// Interfaces:

