import {Team} from "../entities/team.entity";
import {CreateTeamDto} from "../../infra/dtos/create-team.dto";
import {TeamPlayerRelationDto} from "../../infra/dtos/team-player-relation.dto";
import {TeamRelationFilters} from "../entities/team-relation-filters.entity";
import {TeamFilter} from "../entities/team-filter.entity";

export interface ITeamRepository {
  upsert: (createTeamDtos: CreateTeamDto[]) => Promise<Team[]>
  updateRelations: (teamPlayerRelationDto: TeamPlayerRelationDto[]) => Promise<void>
  findOne: (filter: TeamFilter, relations: TeamRelationFilters) => Promise<Team | null>;
  find: (filter?: TeamFilter, relations?: TeamRelationFilters) => Promise<Team[]>
}
export const ITeamRepository = Symbol('ITeamRepository');