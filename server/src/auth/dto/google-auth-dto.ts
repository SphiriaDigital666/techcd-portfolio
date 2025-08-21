/* import { CreateAuthDto } from './create-auth.dto';
export class GoogleAuthDTO extends CreateAuthDto {
  profile_image: string;
}
 */

import { IsEmail, IsOptional, IsString } from 'class-validator';

export enum Role {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  USER = 'USER',
}

export class GoogleAuthDTO {
  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  profile_image: string;

  @IsOptional()
  @IsString()
  pin: string;
}
