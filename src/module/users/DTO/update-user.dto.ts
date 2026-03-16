import { IsNotEmpty, IsEmail, MinLength, IsOptional, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email must be valid' })
  email?: string;
}