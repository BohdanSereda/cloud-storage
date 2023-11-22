import {Module} from "@nestjs/common";
import {RolesService} from "./roles.service";
import {RolesController} from "./roles.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "./entities";
import {User} from "src/user/entities";
import {AuthModule} from "src/auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Role, User]), AuthModule],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
