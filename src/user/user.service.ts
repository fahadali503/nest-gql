import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './user.model';
import { CreateUserInputType } from '../input-types/user.types';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async createUser({ email, fullName, password }: CreateUserInputType) {
    const user = await this.findByEmail(email);
    if (user) {
      throw new Error('User already exists.');
    }

    const newUser = new this.userModel({
      fullName,
      email,
      password: await hash(password, 10),
    });
    await newUser.save();
    return newUser;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async findById(userId: string) {
    return await this.userModel.findById(userId);
  }

  async findAll() {
    return await this.userModel.find();
  }
}
