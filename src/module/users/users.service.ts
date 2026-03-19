// src/modules/users/services/users.service.ts
import { Injectable, NotFoundException, ConflictException, HttpCode, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entities';
import { CreateUserDto } from '../users/DTO/create-user.dto';
import { UpdateUserDto } from '../users/DTO/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ResponseHelper } from '../../common/helpers/response.heper';
import { PaginationHelper } from '../../common/helpers/pagination.heper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // ✅ Inject repository directly
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.userRepository.create({
      email: createUserDto.email,
      name: createUserDto.name,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  async findAll(page: number = 1, perPage: number = 10): Promise<any> {
    const [user, total] = await this.userRepository.findAndCount({
      select: ['id', 'name', 'email', 'role_id', 'department_id', 'phone', 'address'],
      order: {
        id: 'DESC',
      },
      where:{
        is_active: true,
      },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return PaginationHelper.paginate(page, perPage, total, user);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}