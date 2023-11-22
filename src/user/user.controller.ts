import {Controller, Post, Body, Get, UseGuards} from "@nestjs/common";
import {UserService} from "./user.service";
import {AddRoleDto, AuthUserDto, CreateUserDto} from "./dto";
import {JwtAuthGuard} from "src/guards";
import {Roles} from "src/auth/decorators";
import {RolesGuard} from "src/guards";
import {AuthUser} from "src/auth/decorators";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @Roles(["User"])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAll() {
    return await this.userService.getAll();
  }

  @Get("/me")
  @Roles(["User"])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getMe(@AuthUser() user: AuthUserDto) {
    return this.userService.getById(user.id);
  }

  @Post("/role")
  @Roles(["User"])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addRole(@Body() addRoleDto: AddRoleDto) {
    return await this.userService.addRole(addRoleDto);
  }
}
