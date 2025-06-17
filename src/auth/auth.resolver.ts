import { Mutation, Resolver,Args } from '@nestjs/graphql';
import { AuthType } from 'src/user/dto/auth.type';
import { AuthInput } from 'src/user/dto/auth.input';
import { AuthService } from './auth.service';

@Resolver("Auth")
export class AuthResolver {
     constructor(private authService: AuthService) {}
    @Mutation(()=>AuthType)
    public async login(
        @Args('data') data: AuthInput
    ): Promise<AuthType> {
         const response = await this.authService.validateUser(data);
         return{
            user:response.user,
            token:response.token
         }
    }
    }
