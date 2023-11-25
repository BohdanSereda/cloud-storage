import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {File} from "./file.entity";
import {User} from "../../user/entities";

@Entity()
export class StarredFiles {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    name: "created_at",
  })
  public createdAt: Date;

  @ManyToOne(() => File, file => file.starredFiles)
  file: File;

  @ManyToOne(() => User, user => user.starredFiles)
  user: User;
}
