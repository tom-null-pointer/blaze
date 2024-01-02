import {inject, injectable} from "inversify";
import {IPlayerRepository} from "../interfaces/player-repository.interface";
import {CreatePlayerDto} from "../../infra/dtos/create-player.dto";
import {Player} from "../entities/player.entity";

@injectable()
export class UpsertPlayersService {
  @inject(IPlayerRepository)
  private readonly playerRepo: IPlayerRepository;
  async upsert(createPlayerDtos: CreatePlayerDto[]): Promise<Player[]> {
    return this.playerRepo.upsert(createPlayerDtos);
  }
}