import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {REQUEST, Reflector} from "@nestjs/core";
import {Roles} from "../auth/decorators/roles-auth.decorator";
import {Role} from "src/roles/entities";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Inject(REQUEST) private readonly request,
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = this.request;
      const roles = this.reflector.get(Roles, context.getHandler());
      if (!roles) {
        return true;
      }
      const authHeader = request.headers.authorization;
      const token = authHeader.split(" ")[1];

      const user = this.jwtService.verify(token);
      request.user = user;
      return user.roles.some((role: Role) => roles.includes(role.value));
    } catch (e) {
      console.log(e);
      throw new HttpException("No access", HttpStatus.FORBIDDEN);
    }
  }
}
