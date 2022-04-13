import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Post } from './post.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private readonly postModel: ReturnModelType<typeof Post>,
  ) {}

  async createPost(userId: string, title: string, body: string) {
    const post = new this.postModel({ user: userId, title, body });
    await post.save();
    return post;
  }

  async findPostsByUserId(userId: string) {
    return await this.postModel.find({ user: userId });
  }
}
