import {ITeamDatasource} from "../domain/interfaces/team-datasource.interface";
import {TeamModel} from "../domain/models/team.model";

export class GetTeamInfoService {
  private readonly teamDatasource: ITeamDatasource;
  constructor(teamDatasource: ITeamDatasource) {
    this.teamDatasource = teamDatasource;
  }

  async get(id: number): Promise<TeamModel> {
    return this.teamDatasource.getTeamById(id);
  }
}