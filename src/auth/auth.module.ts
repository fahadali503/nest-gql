import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from 'src/user/user.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Constant } from 'src/utils/constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    PassportModule.register({}),
    JwtModule.register({ secret: Constant.jwtSecret }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
