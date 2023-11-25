import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from "typeorm";
import {FileShares} from "./file-shares.entity";
import {StarredFiles} from "./starred_files.entity";

@Entity()
@Tree("nested-set")
export class File {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({type: "varchar", unique: false, nullable: false})
  name: string;

  @Column({type: "varchar", unique: false, nullable: false})
  path: string;

  @Column({type: "int", nullable: false, default: 0})
  lft: number;

  @Column({type: "int", nullable: false, default: 0})
  rgt: number;

  @Column({type: "boolean", nullable: false, default: false, name: "is_folder"})
  isFolder: boolean;

  @Column({type: "int", nullable: false, default: 0})
  size: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    name: "created_at",
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
    name: "updated_at",
  })
  public updatedAt: Date;

  @DeleteDateColumn({
    type: "timestamp",
    nullable: true,
    name: "deleted_at",
  })
  public deletedAt: Date;

  @OneToMany(() => FileShares, fileShares => fileShares.file)
  fileShares: FileShares[];

  @OneToMany(() => StarredFiles, starredFiles => starredFiles.file)
  starredFiles: StarredFiles[];

  @TreeChildren()
  children: File[];

  @TreeParent()
  parent: File;
}
