import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {File} from "./file.entity";
import {User} from "../../user/entities";

@Entity()
export class FileShares {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    name: "created_at",
  })
  public createdAt: Date;

  @ManyToOne(() => File, file => file.fileShares)
  file: File;

  @ManyToOne(() => User, user => user.fileShares)
  user: User;
}
