import {
  IsDefined,
  IsEmail,
  IsEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class userUpdateDto {
  @IsString()
  @IsEmpty()
  @IsDefined()
  @Matches(/^(usr-role):[A-Za-z0-9-]+$/)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  id_user_role: string;

  @IsString()
  updatedBy?: string;
}
