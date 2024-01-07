import {ITeamDatasource} from "../domain/interfaces/team-datasource.interface";
import {BlazeApiClient} from "../../shared/blaze-api/infra/blaze-api.client";
import {TeamModel} from "../domain/models/team.model";

export class TeamBlazeApiDatasource implements ITeamDatasource{
  private readonly apiClient: BlazeApiClient;
  constructor(apiClient: BlazeApiClient) {
    this.apiClient = apiClient;
  }
  async getTeams(withAllRelations: boolean): Promise<TeamModel[]> {
    return this.apiClient.getTeams(withAllRelations);
  }

  async getTeamById(id: number): Promise<TeamModel> {
    return this.apiClient.getTeamById(id);
  }
}