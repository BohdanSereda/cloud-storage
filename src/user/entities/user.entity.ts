import {Role} from "src/roles/entities";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import {FileShares, StarredFiles} from "../../files/entities";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column({unique: true, nullable: false})
  email: string;

  @Column({nullable: false})
  password: string;

  @Column({type: "int", default: 64, name: "storage_size"})
  storageSize: number;

  @Column({default: false})
  banned: boolean;

  @Column({default: "", name: "ban_reason"})
  banReason: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
    name: "updated_at",
  })
  updatedAt: Date;

  @Column({type: "timestamp", nullable: true, name: "last_logged_in"})
  lastLoggedIn: Date;

  @Column({type: "varchar", nullable: true, name: "refresh_token"})
  refreshToken: string;

  @ManyToMany(() => Role, role => role.users)
  @JoinTable()
  roles: Role[];

  @OneToMany(() => FileShares, fileShares => fileShares.user)
  fileShares: FileShares[];

  @OneToMany(() => StarredFiles, starredFiles => starredFiles.user)
  starredFiles: StarredFiles[];
}
