import {CreatePlayerDto} from "../../infra/dtos/create-player.dto";
import {Player} from "../entities/player.entity";

export interface IPlayerRepository {
  upsert: (createPlaterDtos: CreatePlayerDto[]) => Promise<Player[]>
}
export const IPlayerRepository = Symbol('IPlayerRepository');