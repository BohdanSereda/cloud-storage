import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "src/user/dto";
import {UserService} from "src/user/user.service";
import * as bcrypt from "bcryptjs";
import {User} from "src/user/entities";
import {ConfigService} from "@nestjs/config";
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}
  async login(createUserDto: CreateUserDto) {
    const user = await this.activateUser(createUserDto);
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async signup(createUserDto: CreateUserDto): Promise<any> {
    const userExists = await this.userService.getByEmail(createUserDto.email);
    if (userExists) {
      throw new BadRequestException("User already exists");
    }

    const hash = await this.hashData(createUserDto.password);
    const newUser = await this.userService.create({
      ...createUserDto,
      password: hash,
    });
    const tokens = await this.getTokens(newUser);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }
  async logout(userId: string) {
    return await this.userService.update(userId, {refreshToken: null});
  }
  private async activateUser(createUserDto: CreateUserDto) {
    const user = await this.userService.getByEmail(createUserDto.email);
    const passwordEquals = await bcrypt.compare(
      createUserDto.password,
      user.password
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({message: "Wrong email or password"});
  }

  private hashData(data: string) {
    return argon2.hash(data);
  }
  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
      last_logged_in: new Date(),
    });
  }
  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.getById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException("Access Denied");
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken
    );
    if (!refreshTokenMatches) throw new ForbiddenException("Access Denied");
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  private async getTokens(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>("JWT_SECRET"),
        expiresIn: "15m",
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
        expiresIn: "7d",
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
