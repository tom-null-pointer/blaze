import {CreatePlayerDetailDto} from "../../../player-detail/infra/dtos/create-player-detail.dto";

export class CreatePlayerDto {
  apiPlayerId: string;
  key: number;
  name: string;
  details: CreatePlayerDetailDto[];
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;

  constructor(apiPlayerId: string, key: number, name: string, details: CreatePlayerDetailDto[], createdAt?: Date, updatedAt?: Date, active?: boolean) {
    this.key = key;
    this.apiPlayerId = apiPlayerId;
    this.name = name;
    this.details = details;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
  }
}