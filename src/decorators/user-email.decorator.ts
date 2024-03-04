// в несте можно писать собственные декораторы, чтобы доставать нужные поля из запроса

import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserEmail = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest(); // получаем всю инфу о запросе

    return request.user;
  },
);
