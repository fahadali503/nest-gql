import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsEmail, MinLength } from 'class-validator';
@InputType()
export class CreateUserInputType {
  @IsString()
  @Field()
  fullName: string;

  @IsString()
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @MinLength(5)
  @Field()
  password: string;
}
