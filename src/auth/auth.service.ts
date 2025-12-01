import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

type AuthInput = {
  userName: string;
  password: string;
};

type SignInData = {
  userId: number;
  userName: string;
};

type AuthResult = {
  accessToken: string;
  userId: number;
  userName: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.userService.findUserByName(input.userName);

    return user && user.password === input.password
      ? { userId: user.userId, userName: user.userName }
      : null;
  }

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signIn(user);
  }

  async generateJwtToken(user: SignInData): Promise<string> {
    const payload = { sub: user.userId, username: user.userName };
    return this.jwtService.signAsync(payload);
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const accessToken = await this.generateJwtToken(user);
    return {
      accessToken,
      userId: user.userId,
      userName: user.userName,
    };
  }
}
