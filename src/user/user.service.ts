import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import {User} from './user.entity';
import { UpdateUserInput } from './dto/uptade-user.input';

@Injectable()
export class UserService {
   constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
   ) {}
   
   async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findUserById(id): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if(!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

   async createUser(data: CreateUserInput): Promise<User>{
     const user = this.userRepository.create(data);
    const userSaved = await this.userRepository.save(user);

    if(!userSaved) {
      throw new InternalServerErrorException("problem in the  creation of the user");
    }

    return userSaved;

  }

  async updateUser(id:string, data: UpdateUserInput ): Promise<User>{
    const user = await this.findUserById(id);

    await this.userRepository.update(user,{...data});

    const userUptade = this.userRepository.create({...user,...data});
    return userUptade;
  }

  async deleteUser(id:string): Promise<boolean>{
    const user = await this.findUserById(id);

    const deleted = await this.userRepository.delete(user);

    if(deleted){
      return true;
    }
    return false;
  }
}
