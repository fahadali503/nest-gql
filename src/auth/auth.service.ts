import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReturnModelType } from '@typegoose/typegoose';
import { compare } from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'src/user/user.model';
import { JwtPayload } from 'src/utils/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Could not find user with this email.');
    }
    const comparedPassword = await compare(password, user.password);
    if (!comparedPassword) {
      throw new BadRequestException('Invalid email/password.');
    }
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload: JwtPayload = { _id: user._id, email: user.email };
    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
