import {inject, injectable} from "inversify";
import {ITeamRepository} from "../interfaces/team-repository.interface";
import {Team} from "../entities/team.entity";
import {TeamRelationFilters} from "../entities/team-relation-filters.entity";
import {TeamFilter} from "../entities/team-filter.entity";

@injectable()
export class FindTeamsService {
  constructor(
  @inject(ITeamRepository) private readonly teamRepo: ITeamRepository,
  ) {}
  async find(filter?: TeamFilter, relations?: TeamRelationFilters): Promise<Team[]> {
    return this.teamRepo.find(filter, relations);
  }
}