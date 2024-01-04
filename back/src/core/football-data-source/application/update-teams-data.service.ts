import {inject, injectable} from "inversify";
import {IFootballDataSource} from "../domain/interfaces/football-data-source.interface";
import {CreateDetailTypeDto} from "../../detail-type/infra/dtos/create-detail-type.dto";
import {CreatePlayerDetailDto} from "../../player-detail/infra/dtos/create-player-detail.dto";
import {CreatePlayerDto} from "../../player/infra/dtos/create-player.dto";
import {UpsertDetailTypesService} from "../../detail-type/domain/services/upsert-detail-types.service";
import {UpsertPlayersService} from "../../player/domain/services/upsert-players.service";
import {UpsertPlayerDetailsService} from "../../player-detail/domain/services/upsert-player-details.service";
import {UpsertTeamsService} from "../../team/domain/services/upsert-teams.service";
import {CreateTeamDto} from "../../team/infra/dtos/create-team.dto";
import {UpdateTeamPlayerRelationsService} from "../../team/domain/services/update-team-player-relations.service";
import {CreateVenueDto} from "../../venue/infra/dtos/create-venue.dto";
import {UpsertVenuesService} from "../../venue/domain/services/upsert-venues.service";
import {TeamPlayerRelationDto} from "../../team/infra/dtos/team-player-relation.dto";
import {DetailType} from "../../detail-type/domain/entities/detail-type.entity";
import {Player} from "../../player/domain/entities/player.entity";
import {Team} from "../../team/domain/entities/team.entity";
import {CreateCoachDto} from "../../coach/infra/dtos/create-coach.dto";
import {UpsertCoachesService} from "../../coach/domain/services/upsert-coaches.service";
import {BadRequestException} from "../../../shared/errors/bad-request.exception";
import {CustomException} from "../../../shared/errors/custom-exception";
import {InternalServerException} from "../../../shared/errors/internal-server.exception";

@injectable()
export class UpdateTeamsDataService {
  @inject(IFootballDataSource)
  private readonly footballDataSource: IFootballDataSource;
  @inject(UpsertDetailTypesService)
  private readonly upsertDetailTypesService: UpsertDetailTypesService;
  @inject(UpsertPlayersService)
  private readonly upsertPlayersService: UpsertPlayersService;
  @inject(UpsertPlayerDetailsService)
  private readonly upsertPlayerDetailsService: UpsertPlayerDetailsService;
  @inject(UpsertTeamsService)
  private readonly upsertTeamsService: UpsertTeamsService;
  @inject(UpsertCoachesService)
  private readonly upsertCoachesService: UpsertCoachesService;
  @inject(UpsertVenuesService)
  private readonly upsertVenuesService: UpsertVenuesService;
  @inject(UpdateTeamPlayerRelationsService)
  private readonly upsertTeamPlayerRelationsService: UpdateTeamPlayerRelationsService;

  async update() {
    let leagueIdsToFetch = [];
    try {
      leagueIdsToFetch = JSON.parse(process.env.FOOTBALL_API_LEAGUE_IDS_TO_FETCH) as number[];
    } catch(e) {
      throw new BadRequestException('League ids to fetch are not a valid json array.');
    }
    if (!Array.isArray(leagueIdsToFetch)) { throw new BadRequestException('League ids to fetch is a valid json but is not an array.'); }
    try {
      for (let leagueId of leagueIdsToFetch) {
        console.info(`Updating teams from league with id: ${leagueId}`);
        const createTeamDtos = await this.footballDataSource.fetchTeamsByLeagueId(leagueId);
        const {
          createDetailTypeDtos,
          createPlayerDtos,
          createPlayerDetailDtos,
          playerKeys,
          detailTypeKeys,
          uniqueTeams,
          createVenueDtos,
          teamKeysGroupedByVenueKey,
          playerKeysGroupedByTeamKey,
          teamKeysGroupedByCoachKey,
          coaches,
        } = this.groupDataFromCreateTeamDtos(createTeamDtos);

        // upsert detail types
        const detailTypesStored = await this.upsertDetailTypesService.upsert(Array.from(createDetailTypeDtos.values()));
        const storedDetailTypeIdsGroupedByKey = this.groupDetailTypeIdsByKey(detailTypesStored);

        // upsert players
        const playersStored = await this.upsertPlayersService.upsert(Array.from(createPlayerDtos.values()));
        const storedPlayerIdsGroupedByKey = this.groupPlayerIdsByKey(playersStored);

        // insert detail type ids into createPlayerDetailDtos
        playerKeys.forEach(playerKey => {
          detailTypeKeys.forEach(detailTypeKey => {
            const currentComposedKey = `${playerKey}-${detailTypeKey}`;
            if (createPlayerDetailDtos.has(currentComposedKey)) {
              const newPlayerDetail = createPlayerDetailDtos.get(currentComposedKey);
              newPlayerDetail.typeId = storedDetailTypeIdsGroupedByKey.get(detailTypeKey);
              newPlayerDetail.playerId = storedPlayerIdsGroupedByKey.get(playerKey.toString());
              delete newPlayerDetail.type;
              createPlayerDetailDtos.set(currentComposedKey, newPlayerDetail);
            }
          });
        });

        // upsert player_detail
        await this.upsertPlayerDetailsService.upsert(Array.from(createPlayerDetailDtos.values()));

        // upsert teams
        const storedTeams = await this.upsertTeamsService.upsert(Array.from(uniqueTeams.values()));
        const storedTeamIdsGroupedByKey = this.groupTeamIdsByKey(storedTeams);

        // upsert venues
        createVenueDtos.forEach(venueDto => {
          const teamKey = teamKeysGroupedByVenueKey.get(venueDto.name)
          const teamId = storedTeamIdsGroupedByKey.get(teamKey);
          const createVenueDto = createVenueDtos.get(venueDto.name);
          createVenueDto.teamId = teamId;
          createVenueDtos.set(venueDto.name, createVenueDto);
        });
        await this.upsertVenuesService.upsert(Array.from(createVenueDtos.values()));

        // update team player relations
        const teamPlayerRelations: TeamPlayerRelationDto[] = this.buildTeamPlayerRelations(createTeamDtos, storedTeamIdsGroupedByKey, playerKeysGroupedByTeamKey, storedPlayerIdsGroupedByKey);
        await this.upsertTeamPlayerRelationsService.update(teamPlayerRelations);

        // upsert coaches
        coaches.forEach(coach => {
          const teamKey = teamKeysGroupedByCoachKey.get(coach.name);
          coach.teamId = storedTeamIdsGroupedByKey.get(teamKey);
        });
        await this.upsertCoachesService.upsert(Array.from(coaches.values()));
        console.info('Teams Updated Successfully.')
      }
    } catch (e) {
      if (e instanceof CustomException) { throw e; }
      throw new InternalServerException('Error trying to update teams data.', e);
    }
  }

  private groupDataFromCreateTeamDtos(createTeamDtos: CreateTeamDto[]) {
    return createTeamDtos.reduce((accum, createTeamDto) => {
      createTeamDto.players.forEach(player => {
        accum.playerKeysGroupedByTeamKey.has(createTeamDto.key) ? accum.playerKeysGroupedByTeamKey.set(createTeamDto.key, [...(accum.playerKeysGroupedByTeamKey.get(createTeamDto.key)), player.key.toString()]) : accum.playerKeysGroupedByTeamKey.set(createTeamDto.key, [player.key.toString()]);
        accum.playerKeys.add(player.key);
        if (!accum.createPlayerDtos.has(player.key)) {
          accum.createPlayerDtos.set(player.key, player);
        }
        player.details.forEach(detail => {
          accum.createPlayerDetailDtos.set(`${player.key}-${detail.type.key}`, detail);
          accum.detailTypeKeys.add(detail.type.key);
          if (!accum.createDetailTypeDtos.has(detail.type.key)) {
            accum.createDetailTypeDtos.set(detail.type.key, detail.type);
          }
        });
      });
      createTeamDto.venues.forEach(venue => {
        accum.teamKeysGroupedByVenueKey.set(venue.name, createTeamDto.key);
        accum.createVenueDtos.set(venue.name, venue);
      });

      createTeamDto.coaches.forEach(coach => {
        accum.teamKeysGroupedByCoachKey.set(coach.name, createTeamDto.key);
        accum.coaches.set(coach.name, coach);
      });

      const team = createTeamDto;
      delete team.players;
      delete team.venues;
      accum.uniqueTeams.set(team.key, team);
      return accum;
    }, {
      createDetailTypeDtos: new Map<string, CreateDetailTypeDto>(),
      detailTypeKeys: new Set<string>(),
      createPlayerDetailDtos: new Map<string, CreatePlayerDetailDto>(),
      createPlayerDtos: new Map<number, CreatePlayerDto>(),
      playerKeys: new Set<number>(),
      uniqueTeams: new Map<string, CreateTeamDto>(),
      createVenueDtos: new Map<string, CreateVenueDto>(),
      teamKeysGroupedByVenueKey: new Map<string, string>(),
      playerKeysGroupedByTeamKey: new Map<string, string[]>(),
      teamKeysGroupedByCoachKey: new Map<string, string>(),
      coaches: new Map<string, CreateCoachDto>(),
    });
  }

  private groupDetailTypeIdsByKey(detailType: DetailType[]) {
    return detailType.reduce((accum, storedDetailType) => {
      accum.set(storedDetailType.key, storedDetailType.id);
      return accum;
    }, new Map<string, number>());
  }

  private groupPlayerIdsByKey(players: Player[]) {
    return players.reduce((accum, storedPlayer) => {
      accum.set(`${storedPlayer.key}`, storedPlayer.id);
      return accum;
    }, new Map<string, number>());
  }

  private groupTeamIdsByKey(teams: Team[]) {
    return teams.reduce((accum, team) => {
      accum.set(team.key, team.id);
      return accum;
    }, new Map<string, number>);
  }

  private buildTeamPlayerRelations(
    createTeamDtos: CreateTeamDto[],
    teamIdsGroupedByKey: Map<string, number>,
    playerKeysGroupedByTeamKey: Map<string, string[]>,
    playerIdsGroupedByKey: Map<string, number>,
  ) {
    const teamPlayerRelations: TeamPlayerRelationDto[] = []
    createTeamDtos.forEach(team => {
      const teamId = teamIdsGroupedByKey.get(team.key);
      playerKeysGroupedByTeamKey.get(team.key).forEach(playerKey => {
        const playerId = playerIdsGroupedByKey.get(playerKey);
        teamPlayerRelations.push(new TeamPlayerRelationDto(playerId, teamId));
      });
    });
    return teamPlayerRelations;
  }
}
