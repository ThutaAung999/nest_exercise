import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TodoDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('Request Header : ', JSON.stringify(request.headers));
    return request.headers;
  },
);
