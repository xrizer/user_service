import { IsString, Matches } from 'class-validator';
export enum statusEnum {
  'active',
  'unactive',
}
export class userQueryDto {
  @IsString()
  @Matches(/^[a-zA-Z\s]+$/)
  username: string;

  @IsString()
  @Matches(/^[a-zA-Z\s]+$/)
  email: string;

  @IsString()
  password: string;

  @IsString()
  status: string;
}
