import { Injectable } from '@nestjs/common';
import { UserDocument } from '../users/schemas/user.schema';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserDocument, res: Response): Promise<void> {
    // generate the token
    const payload = {
      userId: user._id.toHexString(),
    };

    const token = await this.jwtService.signAsync(payload);

    // attach the token to the cookies
    res.cookie('token', token, {
      httpOnly: true,
      maxAge:
        Number.parseInt(this.configService.getOrThrow('JWT_EXPIRES_IN'), 10) *
        1000,
    });
  }
}
