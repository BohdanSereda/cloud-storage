import {Body, Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto";
import {AccessTokenGuard, RolesGuard} from "src/common/guards";
import {Roles} from "src/common/decorators";

@Controller("roles")
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Roles(["Admin"])
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Roles(["Admin"])
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get("/:value")
  getByValue(@Param("value") value: string) {
    return this.roleService.get(value);
  }
}
