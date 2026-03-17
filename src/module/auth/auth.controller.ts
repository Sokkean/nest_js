import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('/api/v1/auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {

    const token = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    return {
      status: 200,
      message: 'Login Successfully',
      result: token,
    };
  }
}