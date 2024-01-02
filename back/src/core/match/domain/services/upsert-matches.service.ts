import {inject, injectable} from "inversify";
import {IMatchRepository} from "../interfaces/match-repository.interface";
import {CreateMatchDto} from "../../infra/dtos/create-match.dto";
import {Match} from "../domain/match.entity";

@injectable()
export class UpsertMatchesService {
  constructor(
  @inject(IMatchRepository) private readonly matchRepo: IMatchRepository,
  ) {}

  async upsert(matchDtos: CreateMatchDto[]): Promise<Match[]> {
    return this.matchRepo.upsert(matchDtos);
  }
}