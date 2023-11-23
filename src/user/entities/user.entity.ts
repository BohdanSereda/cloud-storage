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

  @Column({type: "int", default: 64})
  storage_size: number;

  @Column({default: false})
  banned: boolean;

  @Column({default: ""})
  ban_reason: string;

  @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;

  @Column({type: "timestamp", nullable: true})
  last_logged_in: Date;

  @Column({type: "varchar", nullable: true})
  refreshToken: string;

  @ManyToMany(() => Role, role => role.users)
  @JoinTable()
  roles: Role[];
}
