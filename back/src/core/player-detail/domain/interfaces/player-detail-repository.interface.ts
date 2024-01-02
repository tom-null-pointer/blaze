import {PlayerDetail} from "../entities/player-detail.entity";
import {CreatePlayerDetailDto} from "../../infra/dtos/create-player-detail.dto";

export interface IPlayerDetailRepository {
  upsert: (createPlayerDetailDtos: CreatePlayerDetailDto[]) => Promise<PlayerDetail[]>
}
export const IPlayerDetailRepository = Symbol('IPlayerDetailRepository');