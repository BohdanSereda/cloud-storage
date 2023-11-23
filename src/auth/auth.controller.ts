import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthTokenUserDto, CreateUserDto} from "src/user/dto";
import {AuthUser} from "../common/decorators";
import {AccessTokenGuard, RefreshTokenGuard} from "../common/guards";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() createUserDto: CreateUserDto) {
    return await this.authService.login(createUserDto);
  }

  @Post("signup")
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get("logout")
  async logout(@AuthUser() user: AuthTokenUserDto) {
    await this.authService.logout(user.id);
  }

  @UseGuards(RefreshTokenGuard)
  @Get("refresh")
  async refreshTokens(@AuthUser() user: AuthTokenUserDto) {
    return await this.authService.refreshTokens(user.id, user.refreshToken);
  }
}
