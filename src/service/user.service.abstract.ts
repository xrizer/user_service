import { IResponse } from '../response/response.interface';
import { userQueryDto } from 'src/dto/user.query.dto';
import { userParamDto } from 'src/dto/user.param.dto';
import { userCreateDto } from 'src/dto/user.create.dto';
import { Prisma } from '@prisma/client';
import { UserPayloadDto } from 'src/dto/user.payload.dto';
export abstract class IRoleService {
  abstract findUserWithQuery(query: userQueryDto): Promise<IResponse>;
  abstract createUser(payload: userCreateDto): Promise<IResponse>;
  abstract updateUser(
    id: userParamDto,
    payload: UserPayloadDto,
  ): Promise<IResponse>;
  abstract deleteUser(param: Prisma.UserWhereUniqueInput): Promise<IResponse>;
}
