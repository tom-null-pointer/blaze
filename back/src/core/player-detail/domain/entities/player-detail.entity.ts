import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn, Unique,
  UpdateDateColumn
} from "typeorm";
import {DetailType} from "../../../detail-type/domain/entities/detail-type.entity";
import {Player} from "../../../player/domain/entities/player.entity";

@Entity()
@Unique(['typeId', 'playerId'])
export class PlayerDetail {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public value: string;

  @ManyToOne(() => DetailType, {cascade: true})
  public type: DetailType;

  @Column()
  public typeId: number;

  @ManyToOne(() => Player, (player: Player) => player.details)
  public player: Player;

  @Column()
  public playerId: number;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;

  @Column({default: true})
  public active: boolean;

  constructor(id: number | undefined, value: string, type: DetailType, player: Player, createdAt: Date, updatedAt: Date, active: boolean) {
    this.id = id;
    this.value = value;
    this.type = type;
    this.player = player;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
  }
}