import { IsString } from 'class-validator';

/* eslint-disable prettier/prettier */
export class UpdateProfileImageDto {
  @IsString()
  profile_image: string;
}
