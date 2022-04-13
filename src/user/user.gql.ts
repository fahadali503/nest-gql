import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/posts/post.gql';

@ObjectType({ description: 'User GQL' })
export class User {
  @Field((type) => String)
  _id: string;

  @Field((type) => String)
  fullName: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  createdAt: string;

  @Field((type) => [Post])
  posts: Post[];

  @Field((type) => String)
  updatedAt: string;
}
