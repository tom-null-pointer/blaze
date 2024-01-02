import {inject, injectable} from "inversify";
import {Team} from "../entities/team.entity";
import {ITeamRepository} from "../interfaces/team-repository.interface";
import {TeamRelationFilters} from "../entities/team-relation-filters.entity";
import {TeamFilter} from "../entities/team-filter.entity";

@injectable()
export class FindTeamByIdService {
  @inject(ITeamRepository)
  private readonly teamRepo: ITeamRepository;
  async find(teamFilter: TeamFilter, relationFilters: TeamRelationFilters): Promise<Team> {
    return this.teamRepo.findOne(teamFilter, relationFilters);
  }
}