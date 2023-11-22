import {
  CanActivate,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import {REQUEST} from "@nestjs/core";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    private jwtService: JwtService
  ) {}

  canActivate(): boolean {
    const request = this.request;
    try {
      const authHeader = request.headers.Authorization;
      const [bearer, token] = authHeader.split(" ");

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({message: "User unauthorized"});
      }

      request.user = this.jwtService.verify(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException({message: "User unauthorized"});
    }
  }
}
