import {CreateDetailTypeDto} from "../../../detail-type/infra/dtos/create-detail-type.dto";

export class CreatePlayerDetailDto {
  public value: string;
  public type: CreateDetailTypeDto;
  public typeId?: number;
  public playerId?: number;
  public createdAt?: Date;
  public updatedAt?: Date;
  public active?: boolean;

  constructor(value: string, type: CreateDetailTypeDto, typeId?: number, playerId?: number, createdAt?: Date, updatedAt?: Date, active?: boolean) {
    this.value = value;
    this.type = type;
    this.typeId = typeId;
    this.playerId = playerId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
  }
}