import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { UserService } from 'src/users/users.service';

import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 토큰 분석
      // jwtFromRequest: (req: Request) => {
      //   const authHeader = req.headers.authorization;
      //   if (authHeader && authHeader.startsWith('Bearer ')) {
      //     const token = authHeader.split(' ')[1];
      //     // 토큰이 "null"이거나 존재하지 않는 경우, "no-token"으로 대체
      //     return token !== 'null' && token ? token : 'no-token';
      //   }
      //   return 'force-validate'; // 헤더가 없는 경우 "no-token" 반환
      // },
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET_KEY, // 생성자에서 바로 접근
    });
  }

  async validate(payload: any): Promise<any> {
    if (payload === 'no-token') {
      console.log('Handling invalid or null token.');
      throw new UnauthorizedException('Invalid or no token provided.');
    }
    const user = await this.userService.getUserRefreshToken(payload._id);
    return user;
  }
}
