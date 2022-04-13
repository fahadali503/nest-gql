import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CreateUserInputType } from 'src/input-types/user.types';
import { Post } from 'src/posts/post.gql';
import { PostsService } from 'src/posts/posts.service';
import { IGqlContext } from 'src/utils/types';
import { User } from './user.gql';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostsService,
  ) {}

  @Query((returns) => [User])
  getAllUsers() {
    return this.userService.findAll();
  }

  @Mutation((returns) => User, { nullable: true })
  async createUser(@Args('data') data: CreateUserInputType) {
    return await this.userService.createUser(data);
  }

  @ResolveField((returns) => [Post])
  posts(@Parent() user: User) {
    return this.postService.findPostsByUserId(user._id);
  }
}
