import {PlayerModel} from "../../../player/domain/player.model";
import {CoachModel} from "../../../coach/domain/coach.model";
import {MatchModel} from "../../../match/domain/match.model";
import {VenueModel} from "../../../venue/domain/venue.model";

export class TeamModel {
  id: number;
  key: string;
  name: string;
  country: string;
  founded: string;
  badge: string;
  venues: VenueModel[];
  players: PlayerModel[];
  coaches: CoachModel[];
  homeMatches: MatchModel[];
  awayMatches: MatchModel[];
  createdAt: Date;
  updatedAt: Date;
  active: boolean;

  constructor(id: number, key: string, name: string, country: string, founded: string, badge: string, venues: VenueModel[], players: PlayerModel[], coaches: CoachModel[], homeMatches: MatchModel[], awayMatches: MatchModel[], createdAt: Date, updatedAt: Date, active: boolean) {
    this.id = id;
    this.key = key;
    this.name = name;
    this.country = country;
    this.founded = founded;
    this.badge = badge;
    this.venues = venues;
    this.players = players;
    this.coaches = coaches;
    this.homeMatches = homeMatches;
    this.awayMatches = awayMatches;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
  }
}