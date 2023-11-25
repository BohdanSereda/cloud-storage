import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {Role} from "../../roles/entities";
import {UserService} from "../../user/user.service";

type JwtPayload = {
  email: string;
  id: string;
  password: string;
  roles: Role[];
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  async validate(payload: JwtPayload) {
    const user = this.userService.getByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
