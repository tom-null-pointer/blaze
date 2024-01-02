import {CreateCoachDto} from "../../infra/dtos/create-coach.dto";
import {Coach} from "../entities/coach.entity";

export interface ICoachRepository {
  upsert: (createCoachDtos: CreateCoachDto[]) => Promise<Coach[]>
}
export const ICoachRepository = Symbol('ICoachRepository');