import {CreateMatchDto} from "../../infra/dtos/create-match.dto";
import {Match} from "../domain/match.entity";

export interface IMatchRepository {
  upsert: (matchDtos: CreateMatchDto[]) => Promise<Match[]>
}
export const IMatchRepository = Symbol('IMatchRepository');