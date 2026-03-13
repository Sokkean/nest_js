import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfig } from '../../config/jwt.config';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { User } from '../../module/users/entities/user.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}