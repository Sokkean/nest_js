// src/modules/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controller/user.controller';
import { UsersService } from './service/users.service';
import { User } from './entities/user.entities';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // ✅ registers repository
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}