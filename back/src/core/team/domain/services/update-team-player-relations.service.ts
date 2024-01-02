import {inject, injectable} from "inversify";
import {ITeamRepository} from "../interfaces/team-repository.interface";
import {TeamPlayerRelationDto} from "../../infra/dtos/team-player-relation.dto";

@injectable()
export class UpdateTeamPlayerRelationsService {
  @inject(ITeamRepository)
  private readonly teamRepo: ITeamRepository;
  async update(teamPlayerRelationDtos: TeamPlayerRelationDto[]): Promise<void> {
    return this.teamRepo.updateRelations(teamPlayerRelationDtos);
  }
}