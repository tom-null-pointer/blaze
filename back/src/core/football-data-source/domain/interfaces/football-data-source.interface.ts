import {CreateTeamDto} from "../../../team/infra/dtos/create-team.dto";
import {CreateMatchDto} from "../../../match/infra/dtos/create-match.dto";

export interface IFootballDataSource {
  fetchTeamsByLeagueId: (leagueId: number) => Promise<CreateTeamDto[]>,
  fetchMatchesByLeagueId: (leagueId: number) => Promise<CreateMatchDto[]>
}

export const IFootballDataSource = Symbol('IFootballDataSource');