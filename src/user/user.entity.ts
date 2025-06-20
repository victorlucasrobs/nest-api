import { Field, ObjectType, ID, HideField } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {hashPasswordTransform} from "src/common/helpers/crypto"

@ObjectType()
@Entity()
export class User {

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  name:string;

  @Column()
  email: string;

  @Column({
     transformer: hashPasswordTransform,
  })
  @HideField()
  password:string;
}