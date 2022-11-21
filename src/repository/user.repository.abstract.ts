import { User } from '@prisma/client';
import { userCreateDto } from 'src/dto/user.create.dto';
import { userUpdateDto } from 'src/dto/user.update.dto';
import { userParamDto } from 'src/dto/user.param.dto';

export abstract class IRoleRepository {
  abstract findUserWithQuery(
    whereCondition: object | undefined,
  ): Promise<{ count: number; data: User[] }>;
  abstract createUser(data: userCreateDto): Promise<User>;
  abstract updateUser(id: userParamDto, data: userUpdateDto): Promise<User>;
  abstract deleteUser(id: userParamDto): Promise<User>;
}
