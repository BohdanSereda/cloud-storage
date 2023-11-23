import {IsDate, IsEmail, IsJWT, IsNotEmpty, IsString} from "class-validator";
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsJWT()
  refreshToken?: string;

  @IsDate()
  last_logged_in?: Date;
}
