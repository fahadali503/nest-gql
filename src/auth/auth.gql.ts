import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.gql';

@ObjectType()
export class Auth {
  @Field((type) => String)
  token: string;
  @Field((type) => User)
  user: User;
}
