import {inject, injectable} from "inversify";
import {IDetailTypeRepository} from "../interfaces/detail-type-repository.interface";
import {CreateDetailTypeDto} from "../../infra/dtos/create-detail-type.dto";
import {DetailType} from "../entities/detail-type.entity";

@injectable()
export class UpsertDetailTypesService {
  @inject(IDetailTypeRepository)
  private readonly detailTypeRepo: IDetailTypeRepository;
  async upsert(createDetailTypeDtos: CreateDetailTypeDto[]): Promise<DetailType[]> {
    return this.detailTypeRepo.upsert(createDetailTypeDtos);
  }
}