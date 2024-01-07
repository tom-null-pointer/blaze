import {ITeamDatasource} from "../domain/interfaces/team-datasource.interface";

export class GetTeamsService {
  private readonly teamDatasource: ITeamDatasource;
  constructor(teamDatasource: ITeamDatasource) {
    this.teamDatasource = teamDatasource;
  }
  async get(withAllRelations: boolean = false) {
    return this.teamDatasource.getTeams(withAllRelations);
  }
}