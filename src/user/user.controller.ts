import {Controller, Post, Body, Get, UseGuards, Patch} from "@nestjs/common";
import {UserService} from "./user.service";
import {AddRoleDto, AuthTokenUserDto, CreateUserDto} from "./dto";
import {AccessTokenGuard} from "src/common/guards";
import {Roles} from "src/common/decorators";
import {RolesGuard} from "src/common/guards";
import {AuthUser} from "src/common/decorators";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @Roles(["User"])
  @UseGuards(AccessTokenGuard, RolesGuard)
  async getAll() {
    return await this.userService.getAll();
  }

  @Patch()
  @UseGuards(AccessTokenGuard)
  async update(
    @AuthUser() user: AuthTokenUserDto,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(user.id, updateUserDto);
  }

  @Get("/me")
  @Roles(["User"])
  @UseGuards(AccessTokenGuard, RolesGuard)
  async getMe(@AuthUser() user: AuthTokenUserDto) {
    return this.userService.getById(user.id);
  }

  @Post("/role")
  @Roles(["Admin"])
  @UseGuards(AccessTokenGuard, RolesGuard)
  async addRole(@Body() addRoleDto: AddRoleDto) {
    return await this.userService.addRole(addRoleDto);
  }
}
