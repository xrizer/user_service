import { HttpException, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './service/app.service';
import { DatabaseService } from './database/database.service';
import { IRoleService } from './service/user.service.abstract';
import { IRoleRepository } from './repository/user.repository.abstract';
import { RoleRepository } from './repository/user.repository';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    DatabaseService,
    {
      provide: IRoleService,
      useClass: AppService,
    },
    {
      provide: IRoleRepository,
      useClass: RoleRepository,
    },
    {
      provide: APP_FILTER,
      useClass: HttpException,
    },
  ],
})
export class AppModule {}
