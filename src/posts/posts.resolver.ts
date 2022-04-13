import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CreatePostInput } from 'src/input-types/post.input';
import { User } from 'src/user/user.gql';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from 'src/utils/jwt.payload';
import { IGqlContext } from 'src/utils/types';
import { Post } from './post.gql';
import { PostsService } from './posts.service';

const pubSub = new PubSub();

@Resolver((of) => Post)
export class PostsResolver {
  constructor(
    private readonly postService: PostsService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Post)
  async createPost(
    @Args('data') data: CreatePostInput,
    @CurrentUser() user: JwtPayload,
  ) {
    const post = await this.postService.createPost(
      user._id,
      data.title,
      data.body,
    );
    pubSub.publish('postAdded', { postAdded: post });
    return post;
  }

  @ResolveField((returns) => User)
  user(@Parent() post: Post) {
    const { user } = post;
    return this.userService.findById(user._id);
  }

  @Subscription((returns) => Post)
  postAdded() {
    return pubSub.asyncIterator('postAdded');
  }
}
