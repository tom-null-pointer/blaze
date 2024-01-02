import {inject, injectable} from "inversify";

import {TeamRestController} from "../core/team/infra/controllers/team-rest.controller";
import {RouteBase} from "./entities/route-base";
import {Route} from "./entities/route.entity";

@injectable()
export default class TeamsRoute extends RouteBase {
  constructor(
    @inject(TeamRestController) private readonly teamController: TeamRestController,
  ){
    super();
    this.setRoutes([
      new Route('get', '/teams', this.teamController.getTeams.bind(this.teamController)),
      new Route('get', '/teams/:teamId/:property?', this.teamController.getTeamById.bind(this.teamController)),
    ]);
  }
}