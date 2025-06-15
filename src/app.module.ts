import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import{TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        "type":"postgres",
        "host": "localhost",
        "port": 5432,
        "username":  "Robson",
        "password": "624272",
        "database": "nest_test",
        "entities": [User],
        "synchronize": true
        }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
