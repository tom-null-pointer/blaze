export class CreateDetailTypeDto {
  public key: string;
  public name: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public active?: boolean;
  constructor(key: string, name: string, createdAt?: Date, updatedAt?: Date, active?: boolean) {
    this.key = key;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
  }
}