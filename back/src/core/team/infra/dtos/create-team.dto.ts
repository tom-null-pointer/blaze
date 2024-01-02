import {CreatePlayerDto} from "../../../player/infra/dtos/create-player.dto";
import {CreateVenueDto} from "../../../venue/infra/dtos/create-venue.dto";
import {CreateCoachDto} from "../../../coach/infra/dtos/create-coach.dto";

export class CreateTeamDto{
  key: string;
  name: string;
  country: string;
  founded: string;
  badge: string;
  venues?: CreateVenueDto[];
  players?: CreatePlayerDto[];
  coaches?: CreateCoachDto[];
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;

  constructor(key?: string, name?: string, country?: string, founded?: string, badge?: string, venues?: CreateVenueDto[], players?: CreatePlayerDto[], coaches?: CreateCoachDto[], createdAt?: Date, updatedAt?: Date, active?: boolean) {
    this.name = name;
    this.key = key;
    this.country = country;
    this.founded = founded;
    this.badge = badge;
    this.venues = venues;
    this.players = players;
    this.coaches = coaches;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
  }
}