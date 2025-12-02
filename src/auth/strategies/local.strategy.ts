import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      usernameField: 'userName',
      passwordField: 'password',
    });
  }
  async validate(userName: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ userName, password });
    console.log('LocalStrategy validate user: ', user);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
