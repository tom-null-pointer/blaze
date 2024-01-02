import {injectable} from "inversify";
import axios, {AxiosInstance} from "axios";
import {IFootballDataSource} from "../../../domain/interfaces/football-data-source.interface";
import {InternalServerException} from "../../../../../shared/errors/internal-server.exception";
import {ApiFootballGetTeamResponseBodyDto} from "../../dtos/api-football-get-team-response-body.dto";
import {CreateTeamDto} from "../../../../team/infra/dtos/create-team.dto";
import {CreatePlayerDto} from "../../../../player/infra/dtos/create-player.dto";
import {CreatePlayerDetailDto} from "../../../../player-detail/infra/dtos/create-player-detail.dto";
import {CreateDetailTypeDto} from "../../../../detail-type/infra/dtos/create-detail-type.dto";
import {CreateVenueDto} from "../../../../venue/infra/dtos/create-venue.dto";
import {CreateCoachDto} from "../../../../coach/infra/dtos/create-coach.dto";
import {CreateMatchDto} from "../../../../match/infra/dtos/create-match.dto";
import {ApiFootballGetMatchesResponseBodyDto} from "../../dtos/api-football-get-matches-response-body.dto";
import {BadRequestException} from "../../../../../shared/errors/bad-request.exception";
import {CustomError} from "../../../../../shared/errors/custom-error";

@injectable()
export class FootballApiClient implements IFootballDataSource {
  private readonly client: AxiosInstance;
  private readonly ACTION_GET_TEAMS = 'get_teams';
  private readonly ACTION_GET_EVENTS = 'get_events';
  constructor() {
    this.client = axios.create({
      baseURL: process.env.FOOTBALL_API_URL,
      params: {APIkey: process.env.FOOTBALL_API_KEY}
    });
  }
  async fetchTeamsByLeagueId(leagueId: number): Promise<CreateTeamDto[]> {
    try {
      const {data} = await this.client.get<ApiFootballGetTeamResponseBodyDto[] | {error:string}>('', {params: {
          action: this.ACTION_GET_TEAMS,
          league_id: leagueId,
        }
      });
      if (!Array.isArray(data) && data.error) {
        throw new InternalServerException(`Error trying to fetch teams with leagueId: ${leagueId}. Api Message: ${data.error}`);
      }
      if (Array.isArray(data)) {
        return this.buildTeamsFromRawData(data);
      }
    } catch(e) {
      if (e instanceof CustomError) { throw e; }
      throw new InternalServerException(`Error trying to fetch teams with leagueId: ${leagueId}.`, e);
    }
  }

  async fetchMatchesByLeagueId(leagueId: number): Promise<CreateMatchDto[]> {
    try {
      this.validatePeriodAmountDays(process.env.FOOTABLL_API_DAYS_BACK_TO_FETCH_MATCHES);
      const periodAmountDays = +process.env.FOOTABLL_API_DAYS_BACK_TO_FETCH_MATCHES;
      const toDate = new Date();
      const fromDate = this.calculateFromDate(toDate, periodAmountDays);

      const {data} = await this.client.get<ApiFootballGetMatchesResponseBodyDto[] | {error: string}>('', {
        params: {
          action: this.ACTION_GET_EVENTS,
          league_id: leagueId,
          from: this.formatDateForApiCall(fromDate),
          to: this.formatDateForApiCall(toDate),
        }
      });
      if (!Array.isArray(data)) {
        let message = `Error trying to fetch matches with leagueId: ${leagueId}.`;
        if (data.error) { message = `Error trying to fetch matches with leagueId: ${leagueId}. Api Message: ${data.error}`;}
        throw new InternalServerException(message);
      }
      return this.buildCreateMatchDtosFromRawData(data);
    } catch (e) {
      if (e instanceof CustomError) { throw e; }
      throw new InternalServerException(`Error trying to fetch matches with leagueId: ${leagueId}.`, e);
    }
  }

  private buildTeamsFromRawData(data: ApiFootballGetTeamResponseBodyDto[]): CreateTeamDto[] {
    const teams: CreateTeamDto[] = [];
    const detailsPropertiesToIgnore = new Set(['player_id', 'player_key', 'player_name']);
    const playerPropertiesPrefix = 'player_';
    data.forEach(team => {
      const players: CreatePlayerDto[] = [];
      const venues: CreateVenueDto[] = [];
      const coaches: CreateCoachDto[] = [];
      // build players
      team.players.forEach(player => {
        const details: CreatePlayerDetailDto[] = [];
        Object.keys(player).forEach(detailKey => {
          if (!detailsPropertiesToIgnore.has(detailKey)) {
            const detailType = new CreateDetailTypeDto(
              detailKey,
              detailKey.replace(playerPropertiesPrefix, ''),
            );
            details.push(new CreatePlayerDetailDto(
              player[detailKey],
              detailType
            ));
          }
        });
        players.push(new CreatePlayerDto(
          player.player_id,
          player.player_key,
          player.player_name,
          details,
        ))
      });

      //build coaches
      coaches.push(
        ...(team.coaches.map(coach => new CreateCoachDto(
        coach.coach_name,
        coach.coach_country,
        coach.coach_age
        )))
      )
      // build venue
      venues.push(new CreateVenueDto(
        team.venue.venue_name,
        team.venue.venue_address,
        team.venue.venue_city,
        team.venue.venue_capacity,
        team.venue.venue_surface,
      ));

      // build teams
      teams.push(new CreateTeamDto(
        team.team_key,
        team.team_name,
        team.team_country,
        team.team_founded,
        team.team_badge,
        venues,
        players,
        coaches
      ));
    });
    return teams;
  }
  private buildCreateMatchDtosFromRawData(data: ApiFootballGetMatchesResponseBodyDto[]) {
    return data.reduce((creatMatchDtos, match) => {
      creatMatchDtos.push(new CreateMatchDto(
        match.match_id,
        match.match_date,
        match.match_time,
        match.match_status,
        undefined,
        match.match_hometeam_id,
        undefined,
        undefined,
        match.match_awayteam_id,
        undefined,
        match.match_hometeam_score,
        match.match_hometeam_halftime_score,
        match.match_awayteam_score,
        match.match_awayteam_halftime_score,
        match.match_hometeam_extra_score,
        match.match_hometeam_penalty_score,
        match.match_awayteam_penalty_score,
        match.match_hometeam_ft_score,
        match.match_awayteam_ft_score,
        match.match_hometeam_system,
        match.match_awayteam_system,
      ));
      return creatMatchDtos;
    }, [] as CreateMatchDto[]);
  }
  private validatePeriodAmountDays(days: any) {
    if (days !== 0 && !days) { throw new BadRequestException('No days back to fetch data were found.'); }
    if (Number.isNaN(days) || !Number.isInteger(+days)) {
      throw new BadRequestException('The amount of days back to fetch data is not a number.');
    }
  }
  private calculateFromDate(actualDate: Date, days: number) {
    const fromDate = new Date();
    fromDate.setDate(actualDate.getDate() - days);
    return fromDate;
  }
  private formatDateForApiCall(date: Date) {
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
  }
}