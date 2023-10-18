import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUser } from 'src/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtUser => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    return request.user as JwtUser;
  },
);
