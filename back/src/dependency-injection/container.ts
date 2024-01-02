import { Container } from "inversify";
import {CronJob} from "../shared/cron-job/entities/cron-job.entity";
import {ApiFootballUpdateTeamsAndMatchesCron} from "../core/football-data-source/infra/cronjobs/api-football-update-teams-and-matches.cron";
import {UpdateTeamsDataService} from "../core/football-data-source/application/update-teams-data.service";
import {FootballApiClient} from "../core/football-data-source/infra/clients/football-api/football-api.client";
import {IFootballDataSource} from "../core/football-data-source/domain/interfaces/football-data-source.interface";
import {ITeamRepository} from "../core/team/domain/interfaces/team-repository.interface";
import {PgTeamRepository} from "../core/team/infra/repos/pg-team.repository";
import {UpsertDetailTypesService} from "../core/detail-type/domain/services/upsert-detail-types.service";
import {IDetailTypeRepository} from "../core/detail-type/domain/interfaces/detail-type-repository.interface";
import {PgDetailTypeRepository} from "../core/detail-type/infra/repos/pg-detail-type.repository";
import {UpsertPlayersService} from "../core/player/domain/services/upsert-players.service";
import {IPlayerRepository} from "../core/player/domain/interfaces/player-repository.interface";
import {PgPlayerRepository} from "../core/player/infra/repos/pg-player.repository";
import {IPlayerDetailRepository} from "../core/player-detail/domain/interfaces/player-detail-repository.interface";
import {PgPlayerDetailRepository} from "../core/player-detail/infra/repos/pg-player-detail.repository";
import {UpsertPlayerDetailsService} from "../core/player-detail/domain/services/upsert-player-details.service";
import {UpsertTeamsService} from "../core/team/domain/services/upsert-teams.service";
import {UpdateTeamPlayerRelationsService} from "../core/team/domain/services/update-team-player-relations.service";
import {IVenueRepository} from "../core/venue/domain/interfaces/venue-repository.interface";
import {PgVenueRepository} from "../core/venue/infra/repos/pg-venue.repository";
import {UpsertVenuesService} from "../core/venue/domain/services/upsert-venues.service";
import {TeamRestController} from "../core/team/infra/controllers/team-rest.controller";
import TeamsRoute from "../routes/teams.route";
import {GetAllTeamsService} from "../core/team/application/get-all-teams.service";
import {GetTeamByIdService} from "../core/team/application/get-team-by-id.service";
import {FindTeamByIdService} from "../core/team/domain/services/find-team-by-id.service";
import {RouteBase} from "../routes/entities/route-base";
import {FindTeamsService} from "../core/team/domain/services/find-teams.service";
import {UpsertCoachesService} from "../core/coach/domain/services/upsert-coaches.service";
import {ICoachRepository} from "../core/coach/domain/interfaces/coach-repository.interface";
import {PgCoachRepository} from "../core/coach/infra/repos/pg-coach.repository";
import {UpdateMatchesDataService} from "../core/football-data-source/application/update-matches-data.service";
import {IMatchRepository} from "../core/match/domain/interfaces/match-repository.interface";
import {PgMatchRepository} from "../core/match/infra/repos/pg-match.repository";
import {UpsertMatchesService} from "../core/match/domain/services/upsert-matches.service";
import {
  UpdateTeamsAndMatchesDataService
} from "../core/football-data-source/application/update-teams-and-matches-data.service";
import {MapFilterToPostgresFilterService} from "../shared/filter/application/map-filter-to-postgres-filter.service";

export const container = new Container();
// Routers:
container.bind<RouteBase>(RouteBase.name).to(RouteBase);
container.bind<TeamsRoute>(TeamsRoute.name).to(TeamsRoute);


// Controllers:
container.bind<TeamRestController>(TeamRestController).toSelf();


// Crons:
container.bind<CronJob>(CronJob).toSelf();
container.bind<ApiFootballUpdateTeamsAndMatchesCron>(ApiFootballUpdateTeamsAndMatchesCron).toSelf();


// Services:
container.bind<FootballApiClient>(FootballApiClient).toSelf();
container.bind<UpsertDetailTypesService>(UpsertDetailTypesService).toSelf();
container.bind<UpsertPlayersService>(UpsertPlayersService).toSelf();
container.bind<UpsertPlayerDetailsService>(UpsertPlayerDetailsService).toSelf();
container.bind<UpsertTeamsService>(UpsertTeamsService).toSelf();
container.bind<UpsertVenuesService>(UpsertVenuesService).toSelf();
container.bind<UpdateTeamPlayerRelationsService>(UpdateTeamPlayerRelationsService).toSelf();
container.bind<GetAllTeamsService>(GetAllTeamsService).toSelf();
container.bind<GetTeamByIdService>(GetTeamByIdService).toSelf();
container.bind<FindTeamByIdService>(FindTeamByIdService).toSelf();
container.bind<FindTeamsService>(FindTeamsService).toSelf();
container.bind<UpsertCoachesService>(UpsertCoachesService).toSelf();
container.bind<UpdateTeamsAndMatchesDataService>(UpdateTeamsAndMatchesDataService).toSelf();
container.bind<UpdateTeamsDataService>(UpdateTeamsDataService).toSelf();
container.bind<UpdateMatchesDataService>(UpdateMatchesDataService).toSelf();
container.bind<UpsertMatchesService>(UpsertMatchesService).toSelf();
container.bind<MapFilterToPostgresFilterService>(MapFilterToPostgresFilterService).toSelf();


// Interfaces:
container.bind<IFootballDataSource>(IFootballDataSource).to(FootballApiClient);
container.bind<ITeamRepository>(ITeamRepository).to(PgTeamRepository);
container.bind<IDetailTypeRepository>(IDetailTypeRepository).to(PgDetailTypeRepository);
container.bind<IPlayerRepository>(IPlayerRepository).to(PgPlayerRepository);
container.bind<IPlayerDetailRepository>(IPlayerDetailRepository).to(PgPlayerDetailRepository);
container.bind<IVenueRepository>(IVenueRepository).to(PgVenueRepository);
container.bind<ICoachRepository>(ICoachRepository).to(PgCoachRepository);
container.bind<IMatchRepository>(IMatchRepository).to(PgMatchRepository);
