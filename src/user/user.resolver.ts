import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService
  ) {}

  @Mutation(()=> User)

  async createUser(
    @Args('data') data: CreateUserInput
  ): Promise<User> {
    const user = await this.userService.createUser(data);
    return user;
    
  }
}
