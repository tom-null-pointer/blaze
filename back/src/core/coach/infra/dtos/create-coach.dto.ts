export class CreateCoachDto {
  name: string;
  country: string;
  age: string;
  teamId?: number

  constructor(name: string, country: string, age: string, teamId?: number) {
    this.name = name;
    this.country = country;
    this.age = age;
    this.teamId = teamId;
  }
}