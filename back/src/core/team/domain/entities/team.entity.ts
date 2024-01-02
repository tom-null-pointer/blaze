import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {Venue} from "../../../venue/domain/entities/venue.entity";
import {Player} from "../../../player/domain/entities/player.entity";
import {Match} from "../../../match/domain/domain/match.entity";
import {Coach} from "../../../coach/domain/entities/coach.entity";

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({unique: true})
  key: string;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  founded: string;

  @Column()
  badge: string;

  @OneToMany(() => Venue, (venue: Venue) => venue.team, {cascade: true})
  venues: Venue[];

  @ManyToMany(() => Player, {cascade: true})
  @JoinTable({name: 'team_player'})
  players: Player[];

  @OneToMany(() => Coach, (coach: Coach) => coach.team)
  coaches: Coach[];

  @OneToMany(() => Match, (match: Match) => match.homeTeam, {cascade: true})
  homeMatches: Match[];

  @OneToMany(() => Match, (match: Match) => match.awayTeam, {cascade: true})
  awayMatches: Match[];

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;

  @Column({default: true})
  active: boolean;

  constructor(id: number | undefined, key: string, name: string, country: string, founded: string, badge: string, venues: Venue[], players: Player[], homeMatches: Match[], awayMatches: Match[], createdAt: Date, updatedAt: Date, active: boolean) {
    this.id = id;
    this.key = key;
    this.name = name;
    this.country = country;
    this.founded = founded;
    this.badge = badge;
    this.venues = venues;
    this.players = players;
    this.homeMatches = homeMatches;
    this.awayMatches = awayMatches;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
  }
}