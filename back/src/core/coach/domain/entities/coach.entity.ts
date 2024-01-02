import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Team} from "../../../team/domain/entities/team.entity";

@Entity()
export class Coach {
  @PrimaryGeneratedColumn()
  public id: number | undefined;

  @Column({unique: true})
  public name: string;

  @Column({nullable: true})
  public country: string;

  @Column({nullable: true})
  public age: string;

  @ManyToOne(() => Team, (team: Team) => team.coaches)
  team: Team;

  @Column()
  teamId: number;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;

  @Column({default: true})
  active: boolean;


  constructor(id: number | undefined, country: string, age: string, team: Team, teamId: number, createdAt: Date, updatedAt: Date, active: boolean) {
    this.id = id;
    this.country = country;
    this.age = age;
    this.team = team;
    this.teamId = teamId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
  }
}