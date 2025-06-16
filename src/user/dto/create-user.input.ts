import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: ' this not stay empty' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: ' this not stay empty' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: ' Password is required' })
    password: string;
  
}
