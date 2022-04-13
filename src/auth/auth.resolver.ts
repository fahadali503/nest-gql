import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/user.gql';
import { JwtPayload } from 'src/utils/jwt.payload';
import { Auth } from './auth.gql';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { GqlAuthGuard } from './gql-auth.guard';
import { LoginArguments } from './login.args';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Query((returns) => Auth, { nullable: true })
  async login(@Args() args: LoginArguments) {
    return this.authService.login(args.email, args.password);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => User)
  me(@CurrentUser() user: JwtPayload) {
    return this.authService.findById(user._id);
  }
}
