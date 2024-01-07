import {PlayerDetailModel} from "../../player-detail/domain/player-detail.model";

export class PlayerModel {
  id: number;
  apiPlayerId: string;
  key: number;
  name: string;
  details: PlayerDetailModel[];
  createdAt: Date;
  updatedAt: Date;
  active: boolean;

  constructor(id: number, apiPlayerId: string, key: number, name: string, details: PlayerDetailModel[], createdAt: Date, updatedAt: Date, active: boolean) {
    this.id = id;
    this.apiPlayerId = apiPlayerId;
    this.key = key;
    this.name = name;
    this.details = details;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
  }
}