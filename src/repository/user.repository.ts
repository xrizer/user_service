import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { userCreateDto } from 'src/dto/user.create.dto';
import { userParamDto } from 'src/dto/user.param.dto';
import { userUpdateDto } from 'src/dto/user.update.dto';
import { DatabaseService } from '../database/database.service';
import { IRoleRepository } from './user.repository.abstract';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(private readonly db: DatabaseService) {}

  async findUserWithQuery(
    whereCondition: object,
  ): Promise<{ count: number; data: User[] }> {
    const [count, data] = await this.db.$transaction([
      this.db.user.count({ ...whereCondition }),
      this.db.user.findMany({ ...whereCondition }),
    ]);
    return { count: count, data: data };
  }

  async createUser(data: userCreateDto): Promise<User> {
    return await this.db.user.create({ data });
  }

  async updateUser(id: userParamDto, data: userUpdateDto): Promise<User> {
    return await this.db.user.update({
      where: { ...id },
      data,
    });
  }
  async deleteUser(id: userParamDto): Promise<User> {
    return await this.db.user.delete({ where: { ...id } });
  }
}
