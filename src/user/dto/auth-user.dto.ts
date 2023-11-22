import {IsArray, IsEmail, IsNotEmpty, IsNotEmptyObject, IsString, IsUUID} from "class-validator";
import { Role } from "src/roles/entities";
export class AuthUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsArray()
  @IsNotEmptyObject()
  readonly roles: Role[]
}
