import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../users/schemas/user.schema';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserDocument => {
    const user: UserDocument = ctx.switchToHttp().getRequest().user;
    return user;
  },
);
