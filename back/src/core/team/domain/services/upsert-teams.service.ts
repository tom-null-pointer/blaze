import {inject, injectable} from "inversify";
import {ITeamRepository} from "../interfaces/team-repository.interface";
import {CreateTeamDto} from "../../infra/dtos/create-team.dto";
import {Team} from "../entities/team.entity";

@injectable()
export class UpsertTeamsService {
  @inject(ITeamRepository)
  private readonly teamRepository: ITeamRepository;

  async upsert(createTeamDtos: CreateTeamDto[]): Promise<Team[]> {
    return await this.teamRepository.upsert(createTeamDtos);
  }
}