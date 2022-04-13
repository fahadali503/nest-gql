import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './user.model';
import { PostsModule } from 'src/posts/posts.module';
import { PostsService } from 'src/posts/posts.service';
import { Post } from 'src/posts/post.model';
@Module({
  imports: [TypegooseModule.forFeature([User, Post]), PostsModule],
  providers: [UserResolver, UserService, PostsService],
  exports: [UserService],
})
export class UserModule {}
