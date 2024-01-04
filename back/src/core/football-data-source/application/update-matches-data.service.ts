import {inject, injectable} from "inversify";
import {IFootballDataSource} from "../domain/interfaces/football-data-source.interface";
import {BadRequestException} from "../../../shared/errors/bad-request.exception";
import {CreateMatchDto} from "../../match/infra/dtos/create-match.dto";
import {FindTeamsService} from "../../team/domain/services/find-teams.service";
import {TeamFilter} from "../../team/domain/entities/team-filter.entity";
import {InFilter} from "../../../shared/filter/domain/entities/in.filter";
import {Team} from "../../team/domain/entities/team.entity";
import {UpsertMatchesService} from "../../match/domain/services/upsert-matches.service";
import {InternalServerException} from "../../../shared/errors/internal-server.exception";
import {CustomException} from "../../../shared/errors/custom-exception";

@injectable()
export class UpdateMatchesDataService {
  constructor(
    @inject(IFootballDataSource) private readonly footballDatasource: IFootballDataSource,
    @inject(FindTeamsService) private readonly findTeamsService: FindTeamsService,
    @inject(UpsertMatchesService) private readonly upsertMatchesService: UpsertMatchesService,
  ) {}
  async update() {
    let leagueIdsToFetch = [];
    try {
      leagueIdsToFetch = JSON.parse(process.env.FOOTBALL_API_LEAGUE_IDS_TO_FETCH) as number[];
    } catch (e) {
      throw new BadRequestException('League ids to fetch are not a valid json array.');
    }
    if (!Array.isArray(leagueIdsToFetch)) { throw new BadRequestException('League ids to fetch is a valid json but is not an array.');}
    try {
      for (let leagueId of leagueIdsToFetch) {
        console.info(`Updating matches from league with id: ${leagueId}`);
        const createMatchDtos = await this.footballDatasource.fetchMatchesByLeagueId(leagueId);
        const {uniqueTeamKeys} = this.groupDataFromCreateMatchDtos(createMatchDtos);
        const teams = await this.findTeamsService.find(new TeamFilter({key: new InFilter<string>([...uniqueTeamKeys.values()])}));
        const teamIdsGroupedByKey = this.groupTeamIdsByKey(teams);
        createMatchDtos.forEach(createMatchDto => {
          const homeTeamId = teamIdsGroupedByKey.get(createMatchDto.homeTeamApiId);
          const awayTeamId = teamIdsGroupedByKey.get(createMatchDto.awayTeamApiId);
          createMatchDto.homeTeamId = homeTeamId;
          createMatchDto.awayTeamId = awayTeamId;
        });
        await this.upsertMatchesService.upsert(createMatchDtos);
      }
      console.info('Matches Updated Successfully.')
    } catch (e) {
      if (e instanceof CustomException) { throw e; }
      throw new InternalServerException('Error trying to update matches.', e);
    }
  }

  private groupDataFromCreateMatchDtos(createMatchDtos: CreateMatchDto[]) {
    return createMatchDtos.reduce((accum, createMatchDto) => {
      accum.uniqueTeamKeys.add(createMatchDto.awayTeamApiId);
      accum.uniqueTeamKeys.add(createMatchDto.homeTeamApiId);
      return accum;
    }, {uniqueTeamKeys: new Set<string>()});
  }

  private groupTeamIdsByKey(teams: Team[]) {
    return teams.reduce((teamIdsGroupedByKey, team) => {
      teamIdsGroupedByKey.set(team.key, team.id);
      return teamIdsGroupedByKey;
    }, new Map<string, number>());
  }
}