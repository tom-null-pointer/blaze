import {ITeamRepository} from "../../domain/interfaces/team-repository.interface";
import {Repository} from "typeorm";
import {Team} from "../../domain/entities/team.entity";
import {CreateTeamDto} from "../dtos/create-team.dto";
import {inject, injectable} from "inversify";
import {InternalServerException} from "../../../../shared/errors/internal-server.exception";
import {TeamPlayerRelationDto} from "../dtos/team-player-relation.dto";
import {TeamRelationFilters} from "../../domain/entities/team-relation-filters.entity";
import {TeamFilter} from "../../domain/entities/team-filter.entity";
import {MapFilterToPostgresFilterService} from "../../../../shared/filter/application/map-filter-to-postgres-filter.service";
import {pgDatasourceInstance} from "../../../../datasources/core-postgres/pg-datasource.instance";

@injectable()
export class PgTeamRepository implements ITeamRepository {
  private readonly teamRepo: Repository<Team> = pgDatasourceInstance.getRepository(Team);

  constructor(
    @inject(MapFilterToPostgresFilterService) private readonly mapFilterToPostgresFilterService: MapFilterToPostgresFilterService
  ) {
  }
  async find(filter?: TeamFilter, relations?: TeamRelationFilters): Promise<Team[]> {
    const pgFilter = filter ? this.mapFilterToPostgresFilterService.map(filter) : undefined;
    try {
      return this.teamRepo.find({
        where: pgFilter,
        relations,
      });
    } catch (e) {
      console.error(e);
      throw new InternalServerException('Error trying to find teams.');
    }
  }
  async findOne(filter, relations: TeamRelationFilters): Promise<Team | null> {
    const pgFilter = filter ? this.mapFilterToPostgresFilterService.map(filter) : undefined;
    try {
      return this.teamRepo.findOne({
        where: pgFilter,
        relations: relations
      });
    } catch (e) {
      throw new InternalServerException(`Error trying to find a team.`, e);
    }
  }
  async upsert(createTeamDtos: (CreateTeamDto | Team)[]): Promise<Team[]> {
    try{
      const result = await this.teamRepo.createQueryBuilder('t')
        .insert()
        .into(Team)
        .values(createTeamDtos)
        .orUpdate(['name', 'country', 'founded', 'badge', 'updatedAt', 'active'], ['key'])
        .returning(['id', 'key', 'name', 'country', 'founded', 'badge', 'createdAt', 'updatedAt', 'active'])
        .execute();
      return result.generatedMaps as Team[];
    } catch (e) {
      throw new InternalServerException('Error trying to upsert teams.', e);
    }
  }

  async updateRelations(teamPlayerRelationDto: TeamPlayerRelationDto[]): Promise<void> {
    try {
      const deleteQuery = this.buildDeleteQuery(teamPlayerRelationDto);
      const insertQuery = this.buildInsertQuery(teamPlayerRelationDto);
      await this.teamRepo.query(deleteQuery);
      await this.teamRepo.query(insertQuery);
    } catch (e) {
      throw new InternalServerException('Error trying to upsert team - player relation.', e);
    }
  }

  private buildDeleteQuery(teamPlayerRelations: TeamPlayerRelationDto[]): string {
    const values = Array.from((new Set(teamPlayerRelations.map(relation => relation.teamId))).values()).join(',');
    return `
      DELETE FROM team_player
      WHERE "teamId" IN (${values})
    `;
  }
  private buildInsertQuery(teamPlayerRelations: TeamPlayerRelationDto[]): string {
    const values = teamPlayerRelations.map(relation => `(${relation.teamId}, ${relation.playerId})`).join(',');
    return `
      INSERT INTO team_player
      ("teamId", "playerId")
      VALUES ${values}
      ON CONFLICT DO NOTHING`;
  }
}