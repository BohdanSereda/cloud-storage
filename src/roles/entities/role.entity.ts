import {User} from "src/user/entities";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({unique: true, nullable: false})
  value: string;

  @Column({nullable: false})
  description: string;

  @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
  public created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updated_at: Date;

  @ManyToMany(() => User, user => user.roles)
  users: User[];
}
