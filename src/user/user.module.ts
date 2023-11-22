import {Module, forwardRef} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities";
import {Role} from "src/roles/entities";
import {RolesModule} from "src/roles/roles.module";
import {AuthModule} from "src/auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
