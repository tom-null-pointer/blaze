import {injectable} from "inversify";
import {ICoachRepository} from "../../domain/interfaces/coach-repository.interface";
import {Repository} from "typeorm";
import {Coach} from "../../domain/entities/coach.entity";
import {pgDatasource} from "../../../../main";
import {CreateCoachDto} from "../dtos/create-coach.dto";
import {InternalServerException} from "../../../../shared/errors/internal-server.exception";

@injectable()
export class PgCoachRepository implements ICoachRepository{
  private readonly coachRepo:Repository<Coach> = pgDatasource.getRepository(Coach);

  async upsert(coachDtos: CreateCoachDto[]): Promise<Coach[]> {
    try {
      const result = await this.coachRepo.createQueryBuilder('c')
        .insert()
        .into(Coach)
        .values(coachDtos)
        .orUpdate(['country', 'age', 'teamId', 'updatedAt', 'active'], ['name'])
        .returning(['id', 'name', 'country', 'age', 'teamId', 'createdAt', 'updatedAt', 'active'])
        .execute();
      return result.generatedMaps as Coach[];
    } catch (e) {
      console.error(e);
      throw new InternalServerException('Error trying to upsert coaches.');
    }
  }
}