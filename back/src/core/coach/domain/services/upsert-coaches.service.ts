import {inject, injectable} from "inversify";
import {ICoachRepository} from "../interfaces/coach-repository.interface";
import {Coach} from "../entities/coach.entity";
import {CreateCoachDto} from "../../infra/dtos/create-coach.dto";

@injectable()
export class UpsertCoachesService {
  constructor(
    @inject(ICoachRepository) private readonly coachRepo: ICoachRepository,
  ) {}
  async upsert(coachDtos: CreateCoachDto[]): Promise<Coach[]> {
    return this.coachRepo.upsert(coachDtos);
  }
}