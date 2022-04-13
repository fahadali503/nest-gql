import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.gql';

@ObjectType()
export class Post {
  @Field((type) => String)
  _id: string;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  body: string;

  @Field((type) => User)
  user: User;

  @Field((type) => String)
  createdAt: string;

  @Field((type) => String)
  updatedAt: string;
}
