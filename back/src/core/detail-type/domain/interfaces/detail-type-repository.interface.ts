import {CreateDetailTypeDto} from "../../infra/dtos/create-detail-type.dto";
import {DetailType} from "../entities/detail-type.entity";

export interface IDetailTypeRepository {
  upsert: (createDetailType: CreateDetailTypeDto[]) => Promise<DetailType[]>
}
export const IDetailTypeRepository = Symbol('IDetailTypeRepository');