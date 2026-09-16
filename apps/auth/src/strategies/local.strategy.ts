import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/services/users.service';
import { Injectable } from '@nestjs/common';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<UserDocument> {
    const validatedUser: UserDocument = await this.usersService.validateUser({
      email,
      password,
    });

    return validatedUser;
  }
}
