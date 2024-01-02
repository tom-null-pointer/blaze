import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export class DetailType {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({unique: true})
  key: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;

  @Column({default: true})
  active: boolean;


  constructor(id: number | undefined, key: string, name: string, createdAt: Date, updatedAt: Date, active: boolean) {
    this.id = id;
    this.key = key;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
  }
}