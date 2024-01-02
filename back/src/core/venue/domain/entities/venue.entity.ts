import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {Team} from "../../../team/domain/entities/team.entity";

@Entity()
export class Venue {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({unique: true})
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  capacity: string;

  @Column()
  surface: string;

  @ManyToOne(() => Team, (team: Team) => team.venues)
  team: Team;

  @Column()
  teamId: number;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;

  @Column({default: true})
  active: boolean;


  constructor(id: number | undefined, name: string, address: string, city: string, capacity: string, surface: string, team: Team,  createdAt: Date, updatedAt: Date, active: boolean, teamId?: number,) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.city = city;
    this.capacity = capacity;
    this.surface = surface;
    this.team = team;
    this.teamId = teamId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
  }
}