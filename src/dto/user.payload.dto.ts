import {
  IsString,
  Matches,
  IsOptional,
  IsEmpty,
  IsDefined,
  IsEmail,
} from 'class-validator';

export class UserPayloadDto {
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
  @IsOptional()
  @Matches(/^(user):[A-Za-z0-9-]+$/)
  createdBy?: string;

  @IsString()
  @IsOptional()
  @Matches(/^(user):[A-Za-z0-9-]+$/)
  updatedBy?: string;
}
