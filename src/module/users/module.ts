import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controller/user.controller';
import { UsersService } from './service/users.service';
import { User } from './entities/user.entities';
import { AuthMiddleware } from '../../common/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // ✅ registers repository
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) // you can also add LoggerMiddleware here
      .forRoutes({ path: '/api/v1/users', method: RequestMethod.GET }); // apply middleware to all routes in this controller
  }
}