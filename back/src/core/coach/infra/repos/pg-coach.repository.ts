import {injectable} from "inversify";
import {ICoachRepository} from "../../domain/interfaces/coach-repository.interface";
import {Repository} from "typeorm";
import {Coach} from "../../domain/entities/coach.entity";
import {CreateCoachDto} from "../dtos/create-coach.dto";
import {InternalServerException} from "../../../../shared/errors/internal-server.exception";
import {pgDatasourceInstance} from "../../../../datasources/core-postgres/pg-datasource.instance";

@injectable()
export class PgCoachRepository implements ICoachRepository{
  private readonly coachRepo:Repository<Coach> = pgDatasourceInstance.getRepository(Coach);

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