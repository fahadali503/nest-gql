import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Constant } from 'src/utils/constants';
import { JwtPayload } from 'src/utils/jwt.payload';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Constant.jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
