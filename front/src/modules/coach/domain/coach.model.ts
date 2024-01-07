import {TeamModel} from "../../team/domain/models/team.model";

export class CoachModel {
  public id: number | undefined;
  public name: string;
  public country: string;
  public age: string;
  team: TeamModel;
  teamId: number;
  public createdAt: Date;
  public updatedAt: Date;
  active: boolean;
  constructor(id: number, name: string, country: string, age: string, team: TeamModel, teamId: number, createdAt: Date, updatedAt: Date, active: boolean) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.age = age;
    this.team = team;
    this.teamId = teamId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
  }
}