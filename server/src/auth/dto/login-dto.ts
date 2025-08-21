import { IsEmail, IsString } from "class-validator";

export enum Role {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  USER = 'USER',
}

export class LoginDto {
  @IsString()
  password: string;
  @IsEmail()
  email: string;
}
