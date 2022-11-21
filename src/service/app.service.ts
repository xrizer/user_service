import { Injectable } from '@nestjs/common';
import { userCreateDto } from '../dto/user.create.dto';
import { userQueryDto } from '../dto/user.query.dto';
import { Response } from '../response/response';
import { IResponse } from '../response/response.interface';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from '../entities/user.entity';
import { userParamDto } from 'src/dto/user.param.dto';
import { IRoleService } from './user.service.abstract';
import { UserPayloadDto } from 'src/dto/user.payload.dto';
import { IRoleRepository } from 'src/repository/user.repository.abstract';

@Injectable()
export class AppService implements IRoleService {
  constructor(private readonly db: IRoleRepository) {}

  async findUserWithQuery(query: userQueryDto): Promise<IResponse> {
    const fakeRole = [
      {
        id: 'percobaan_id',
        role: 'CEO',
        username: 'ceo_kita',
        email: 'ceo_kita@example.com',
        status: false,
        createdBy: 'user:f23957ed-d6f1-4ce2-8807-28a2cf4f93b2',
        createdAt: 1665050354335,
        updatedBy: null,
        updatedAt: null,
      },
      {
        id: 'id_baru',
        role: 'CTO',
        username: 'cto_kita',
        email: 'cto_kita@example.com',
        status: false,
        createdBy: 'user:f23957ed-d6f1-4ce2-8807-28a2cf4f93b2',
        createdAt: 1665050354335,
        updatedBy: null,
        updatedAt: null,
      },
      {
        id: 'example_id',
        role: 'owner',
        username: 'owner_kits',
        email: 'cto_kita@example.com',
        status: true,
        createdBy: 'user:f23957ed-d6f1-4ce2-8807-28a2cf4f93b2',
        createdAt: 1665050354335,
        updatedBy: null,
        updatedAt: null,
      },
    ];
    let whereQuery = undefined;
    if (query.status !== undefined) {
      const statusQuery = this.statusToBool(query.status.toString());
      const id_user =
        fakeRole[fakeRole.findIndex((x) => x.status === statusQuery)].id;
      whereQuery = {
        where: { id_user_role: id_user },
      };
    }
    if (query.status !== undefined) {
      const statusQuery = this.statusToBool(query.status.toString());
      const id_user =
        fakeRole[fakeRole.findIndex((x) => x.status === statusQuery)].id;
      whereQuery = {
        where: { id_user_role: id_user },
      };
    }
    if (query.status !== undefined && query.email !== undefined) {
      const statusQuery = this.statusToBool(query.status.toString());
      const id_user =
        fakeRole[fakeRole.findIndex((x) => x.status === statusQuery)].id;
      whereQuery = {
        where: { id_user_role: id_user, email: query.email },
      };
    }
    if (query.status !== undefined && query.username !== undefined) {
      const statusQuery = this.statusToBool(query.status.toString());
      const id_user =
        fakeRole[fakeRole.findIndex((x) => x.status === statusQuery)].id;
      whereQuery = {
        where: { id_user_role: id_user, email: query.username },
      };
    }
    if (
      query.status !== undefined &&
      query.username !== undefined &&
      query.email !== undefined
    ) {
      const statusQuery = this.statusToBool(query.status.toString());
      const id_user =
        fakeRole[fakeRole.findIndex((x) => x.status === statusQuery)].id;
      whereQuery = {
        where: {
          id_user_role: id_user,
          email: query.username,
          username: query.username,
        },
      };
    }
    if (query.email !== undefined) {
      whereQuery = {
        where: {
          email: query.email,
        },
      };
    }
    if (query.username !== undefined && query.email !== undefined) {
      whereQuery = {
        where: {
          username: query.username,
          email: query.email,
        },
      };
    }
    if (whereQuery === undefined) {
      whereQuery = {
        where: {},
      };
    }

    const data = await this.db.findUserWithQuery(whereQuery);
    const transformData = data.data.map((row) => {
      const rolemaker =
        fakeRole[fakeRole.findIndex((x) => x.id === row.id_user_role)].role;
      const statusmaker =
        fakeRole[fakeRole.findIndex((x) => x.id === row.id_user_role)].status;
      return new UserEntity({
        id: row.id,
        role: rolemaker,
        username: row.username,
        email: row.email,
        status: statusmaker === true ? 'active' : 'unactive',
        createdBy: row.createdBy,
        createdAt: row.createdAt,
        updatedAt: null,
        updatedBy: null,
      });
    });
    return new Response(200, 'success', data.count, transformData, null);
  }

  async createUser(payload: userCreateDto): Promise<IResponse> {
    const id = uuidv4();
    let createdBy = '';
    if (payload.createdBy !== undefined) {
      createdBy = payload.createdBy;
    }
    let updatedBy = '';
    if (payload.updatedBy !== undefined) {
      updatedBy = payload.updatedBy;
    }
    const data = {
      id: `user:${id}`,
      username: payload.username,
      password: payload.password,
      email: payload.email,
      id_user_role: payload.id_user_role,
      createdBy: createdBy,
      updatedBy: updatedBy,
    };
    await this.db.createUser(data);
    return new Response(201, 'created', 1, null, null);
  }

  async updateUser(
    id: userParamDto,
    payload: UserPayloadDto,
  ): Promise<IResponse> {
    await this.db.updateUser(id, payload);
    return new Response(200, 'success', 0, [], null);
  }
  async deleteUser(id: userParamDto): Promise<IResponse> {
    await this.db.deleteUser(id);
    return new Response(200, 'success', 0, null, null);
  }
  private statusToBool(status: string): boolean {
    if (status === 'active') return true;
    return false;
  }
}
