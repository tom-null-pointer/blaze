import {inject, injectable} from "inversify";
import {FindTeamsService} from "../domain/services/find-teams.service";
import {TeamRelationFilters} from "../domain/entities/team-relation-filters.entity";

@injectable()
export class GetAllTeamsService {
  constructor(
    @inject(FindTeamsService) private readonly findTeamsService: FindTeamsService,
  ) {}
  async get(relations: TeamRelationFilters) {
    return this.findTeamsService.find(undefined, relations);
  }
}