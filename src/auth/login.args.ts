import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@ArgsType()
export class LoginArguments {
  @IsString()
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;
}
