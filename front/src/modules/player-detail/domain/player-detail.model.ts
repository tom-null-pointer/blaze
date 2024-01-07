import {PlayerModel} from "../../player/domain/player.model";
import {DetailTypeModel} from "../../detail-type/domain/detail-type.model";

export class PlayerDetailModel {
  public id: number;
  public value: string;
  public type: DetailTypeModel;
  public typeId: number;
  public player: PlayerModel;
  public playerId: number;
  public createdAt: Date;
  public updatedAt: Date;
  public active: boolean;


  constructor(id: number, value: string, type: DetailTypeModel, typeId: number, player: PlayerModel, playerId: number, createdAt: Date, updatedAt: Date, active: boolean) {
    this.id = id;
    this.value = value;
    this.type = type;
    this.typeId = typeId;
    this.player = player;
    this.playerId = playerId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
  }
}