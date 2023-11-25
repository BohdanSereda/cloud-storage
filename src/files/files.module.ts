import {FilesService} from "./files.service";
import {FilesController} from "./files.controller";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/entities";
import {Role} from "../roles/entities";
import {File, FileShares, StarredFiles} from "./entities";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, File, FileShares, StarredFiles]),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
