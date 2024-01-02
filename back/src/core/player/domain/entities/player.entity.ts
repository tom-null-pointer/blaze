import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn, Unique,
  UpdateDateColumn
} from "typeorm";
import {PlayerDetail} from "../../../player-detail/domain/entities/player-detail.entity";

@Entity()
@Unique(['apiPlayerId', 'key'])
export class Player {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({unique: true})
  apiPlayerId: string;

  @Column({unique: true, type: 'bigint'})
  key: number;

  @Column()
  name: string;

  @OneToMany(() => PlayerDetail, (playerDetail: PlayerDetail) => playerDetail.player, {cascade: true})
  details: PlayerDetail[];

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;

  @Column({default: true})
  active: boolean;


  constructor(id: number | undefined, apiPlayerId: string, key: number, name: string, details: PlayerDetail[], createdAt: Date, updatedAt: Date, active: boolean) {
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