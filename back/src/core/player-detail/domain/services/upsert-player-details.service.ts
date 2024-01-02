import {inject, injectable} from "inversify";
import {IPlayerDetailRepository} from "../interfaces/player-detail-repository.interface";
import {CreatePlayerDetailDto} from "../../infra/dtos/create-player-detail.dto";
import {PlayerDetail} from "../entities/player-detail.entity";

@injectable()
export class UpsertPlayerDetailsService {
  @inject(IPlayerDetailRepository)
  private readonly playerDetailRepo: IPlayerDetailRepository;
  async upsert(createPlayerDetailDtos: CreatePlayerDetailDto[]): Promise<PlayerDetail[]> {
    return this.playerDetailRepo.upsert(createPlayerDetailDtos);
  }
}