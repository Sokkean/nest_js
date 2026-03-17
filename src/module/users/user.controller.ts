import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe , UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/DTO/create-user.dto';
import { UpdateUserDto } from '../users/DTO/update-user.dto';
import { JwtAuthGuard } from '../../common/guards/jwt.guard.module';

@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return {
      status: 200,
      message: 'Created User Successfully',
      result: user.id,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const user = await this.usersService.findAll();

    return {
      status: 200,
      result:user
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    console.log(user);

    return {
      status: 200,
      result:user
    };
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);

    return {
      status: 200,
      message: 'Updated User Successfully',
      result: user.id,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.remove(id);

    return {
      status: 200,
      message: 'Deleted User Successfully',
      result: id,
    };
  }
}