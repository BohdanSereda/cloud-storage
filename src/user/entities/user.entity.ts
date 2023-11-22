import {Role} from "src/roles/entities";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column({unique: true, nullable: false})
  email: string;

  @Column({nullable: false})
  password: string;

  @Column({default: false})
  banned: boolean;

  @Column({default: ""})
  banReason: string;

  @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
  public created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updated_at: Date;

  @ManyToMany(() => Role, role => role.users)
  @JoinTable()
  roles: Role[];
}
