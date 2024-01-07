import {TeamModel} from "../../team/domain/models/team.model";

export class VenueModel {
  id: number;
  name: string;
  address: string;
  city: string;
  capacity: string;
  surface: string;
  team: TeamModel;
  teamId: number;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;

  constructor(id: number, name: string, address: string, city: string, capacity: string, surface: string, team: TeamModel, teamId: number, createdAt: Date, updatedAt: Date, active: boolean) {
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