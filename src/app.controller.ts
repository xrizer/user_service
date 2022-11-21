import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { userCreateDto } from './dto/user.create.dto';
import { userQueryDto } from './dto/user.query.dto';
import { userUpdateDto } from './dto/user.update.dto';
import { userParamDto } from './dto/user.param.dto';
import { IRoleService } from './service/user.service.abstract';

@Controller('/v1/api')
export class AppController {
  constructor(private readonly appService: IRoleService) {}

  @Get('/user')
  async getUserWithQuery(
    @Res() response: Response,
    @Query() query: userQueryDto,
  ): Promise<any> {
    const result = await this.appService.findUserWithQuery(query);
    return response.status(result.code).send(result);
  }

  @Post('/user')
  async createUser(
    @Res() response: Response,
    @Body() data: userCreateDto,
  ): Promise<any> {
    const result = await this.appService.createUser(data);
    return response.status(result.code).send(result);
  }

  @Put('/user/:id')
  async updateUser(
    @Res() response: Response,
    @Param() id: userParamDto,
    @Body() data: userUpdateDto,
  ): Promise<any> {
    const result = await this.appService.updateUser(id, data);
    return response.status(result.code).send(result);
  }

  @Delete('/user/:id')
  async deleteUser(
    @Res() response: Response,
    @Param('id') id: userParamDto,
  ): Promise<any> {
    const result = await this.appService.deleteUser(id);
    return response.status(result.code).send(result);
  }
}
