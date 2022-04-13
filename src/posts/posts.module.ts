import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { TypegooseModule } from 'nestjs-typegoose';
import { Post } from './post.model';
import { User } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypegooseModule.forFeature([Post, User])],
  providers: [PostsService, PostsResolver, UserService],
  exports: [PostsService],
})
export class PostsModule {}
