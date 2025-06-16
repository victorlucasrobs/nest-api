import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: ' this not stay empty' })
  name?: string;

  @IsEmail()
  @IsOptional()
  @IsNotEmpty({ message: ' this not stay empty' })
  email?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: ' Password is required' })
  password?: string;

}
