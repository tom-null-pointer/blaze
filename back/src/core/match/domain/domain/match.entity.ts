import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {Team} from "../../../team/domain/entities/team.entity";

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  public id: number | undefined;

  @Column({unique: true})
  public apiFootballId: string;

  @Column()
  public date: string;

  @Column()
  public time: string;

  @Column()
  public status: string;

  @ManyToOne(() => Team, (team: Team) => team.homeMatches)
  @JoinColumn({ name: 'homeTeamId', referencedColumnName: 'id' })
  public homeTeam: Team;

  @Column()
  public homeTeamId: number;

  @ManyToOne(() => Team, (team: Team) => team.awayMatches)
  @JoinColumn({ name: 'awayTeamId', referencedColumnName: 'id' })
  public awayTeam: Team;

  @Column()
  public awayTeamId: number;

  @Column({nullable: true})
  public homeTeamScore: string;

  @Column({nullable: true})
  public homeTeamHalfTimeScore: string;

  @Column({nullable: true})
  public awayTeamScore: string;

  @Column({nullable: true})
  public awayTeamHalfTimeScore: string;

  @Column({nullable: true})
  public homeTeamExtraScore: string;

  @Column({nullable: true})
  public awayTeamExtraScore: string;

  @Column({nullable: true})
  public homeTeamPenaltyScore: string;

  @Column({nullable: true})
  public awayTeamPenaltyScore: string;

  @Column({nullable: true})
  public homeTeamFtScore: string;

  @Column({nullable: true})
  public awayTeamFtScore: string;

  @Column({nullable: true})
  public homeTeamSystem: string;

  @Column({nullable: true})
  public awayTeamSystem: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;

  @Column({default: true})
  active: boolean;

  constructor(id: number | undefined, apiFootballId: string, date: string, time: string, status: string, homeTeam: Team, homeTeamId: number, awayTeam: Team, awayTeamId: number, homeTeamScore: string, homeTeamHalfTimeScore: string, awayTeamScore: string, awayTeamHalfTimeScore: string, homeTeamExtraScore: string, awayTeamExtraScore: string, homeTeamPenaltyScore: string, awayTeamPenaltyScore: string, homeTeamFtScore: string, awayTeamFtScore: string, homeTeamSystem: string, awayTeamSystem: string, createdAt: Date, updatedAt: Date, active: boolean) {
    this.id = id;
    this.apiFootballId = apiFootballId;
    this.date = date;
    this.time = time;
    this.status = status;
    this.homeTeam = homeTeam;
    this.homeTeamId = homeTeamId;
    this.awayTeam = awayTeam;
    this.awayTeamId = awayTeamId;
    this.homeTeamScore = homeTeamScore;
    this.homeTeamHalfTimeScore = homeTeamHalfTimeScore;
    this.awayTeamScore = awayTeamScore;
    this.awayTeamHalfTimeScore = awayTeamHalfTimeScore;
    this.homeTeamExtraScore = homeTeamExtraScore;
    this.awayTeamExtraScore = awayTeamExtraScore;
    this.homeTeamPenaltyScore = homeTeamPenaltyScore;
    this.awayTeamPenaltyScore = awayTeamPenaltyScore;
    this.homeTeamFtScore = homeTeamFtScore;
    this.awayTeamFtScore = awayTeamFtScore;
    this.homeTeamSystem = homeTeamSystem;
    this.awayTeamSystem = awayTeamSystem;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
  }
}