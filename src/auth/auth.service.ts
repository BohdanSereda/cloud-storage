import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import * as argon from "argon2";
import {CreateUserDto} from "src/user/dto";
import {UserService} from "src/user/user.service";
import * as bcrypt from "bcryptjs";
import {User} from "src/user/entities";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}
  async login(createUserDto: CreateUserDto) {
    const user = await this.activateUser(createUserDto);
    return this.generateToken(user);
  }

  async signup(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.getByEmail(createUserDto.email);

    if (existingUser) {
      throw new HttpException(
        "User with this email already exists",
        HttpStatus.BAD_REQUEST
      );
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 5);
    const user = await this.userService.create({
      ...createUserDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };
    return {
      token: this.jwtService.sign(payload),
    };
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
}
