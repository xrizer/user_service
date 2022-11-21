import { Matches, IsString } from 'class-validator';
export class userParamDto {
  @IsString()
  @Matches(/^(usr-role):[a-z0-9-]+$/)
  id: string;
}
