import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import{TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import "dotenv/config"
@Module({
  imports: [
      TypeOrmModule.forRoot({
        "type":"postgres",
        "host": process.env.HOST,
        "port": parseInt( "process.env.DB_PORT" ),
        "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
        "database": process.env.DATABASE,
        "entities": [User],
        "synchronize": true
        }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context:({req}) =>([req]),
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
