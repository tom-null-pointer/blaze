import {IDetailTypeRepository} from "../../domain/interfaces/detail-type-repository.interface";
import {Repository} from "typeorm";
import {DetailType} from "../../domain/entities/detail-type.entity";
import {CreateDetailTypeDto} from "../dtos/create-detail-type.dto";
import {injectable} from "inversify";
import {InternalServerException} from "../../../../shared/errors/internal-server.exception";
import {pgDatasourceInstance} from "../../../../datasources/core-postgres/pg-datasource.instance";

@injectable()
export class PgDetailTypeRepository implements IDetailTypeRepository {
  private readonly detailTypeRepo: Repository<DetailType> = pgDatasourceInstance.getRepository(DetailType);
  async upsert(createDetailType: CreateDetailTypeDto[]): Promise<DetailType[]> {
    try {
      const result = await this.detailTypeRepo.createQueryBuilder('dt')
        .insert()
        .into(DetailType)
        .values(createDetailType)
        .orUpdate(['name', 'updatedAt', 'active'], ['key'])
        .returning(['id', 'key', 'name', 'updatedAt', 'createdAt', 'active'])
        .execute();
      return result.generatedMaps as DetailType[];
    } catch (e) {
      console.error(e);
      throw new InternalServerException('Error trying to upsert detail types.');
    }
  }
}