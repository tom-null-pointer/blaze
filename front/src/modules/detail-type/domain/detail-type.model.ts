export class DetailTypeModel {
  id: number;
  key: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;

  constructor(id: number, key: string, name: string, createdAt: Date, updatedAt: Date, active: boolean) {
    this.id = id;
    this.key = key;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
  }
}