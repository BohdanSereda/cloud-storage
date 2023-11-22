import {Body, Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto";
import {JwtAuthGuard, RolesGuard} from "src/guards";
import {Roles} from "src/auth/decorators";

@Controller("roles")
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Roles(["Admin"])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Roles(["Admin"])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/:value")
  getByValue(@Param("value") value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
