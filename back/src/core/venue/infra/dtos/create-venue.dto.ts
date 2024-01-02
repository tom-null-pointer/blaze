export class CreateVenueDto {
  public name: string;
  public address: string;
  public city: string;
  public capacity: string;
  public surface: string;
  public teamId?: number;
  public createdAt?: Date;
  public updatedAt?: Date;
  public active?: boolean;

  constructor(name: string, address: string, city: string, capacity: string, surface: string, teamId?: string, createdAt?: Date, updatedAt?: Date, active?: boolean) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.capacity = capacity;
    this.surface = surface;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
  }
}