import {TeamModel} from "../models/team.model";

export interface ITeamDatasource {
  getTeams: (withAllRelations: boolean) => Promise<TeamModel[]>
  getTeamById: (id: number) => Promise<TeamModel>
}