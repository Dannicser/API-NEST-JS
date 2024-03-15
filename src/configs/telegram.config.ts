import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from 'src/telegram/telegram.interface';

// подключается в asyncRootFactory
export const getTelegramConfig = (
  configService: ConfigService,
): ITelegramOptions => {
  const token = configService.get('TELEGRAM_BOT_TOKEN');

  if (!token) {
    throw new Error('telegram token is missed');
  }

  return {
    chatId: configService.get('TELEGRAM_CHAT_ID') || '',
    token,
  };
};
