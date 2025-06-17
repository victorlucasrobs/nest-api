import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            useFactory:()=>({
                 secret: process.env.JWT_SECRET,
                 signOptions:{
                    expiresIn: "100s"
                 }
            })
           

        })
    ],
  providers: [AuthService, AuthResolver, UserService, JwtStrategy]
})
export class AuthModule {}
