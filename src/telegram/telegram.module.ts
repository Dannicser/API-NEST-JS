import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Module({
  providers: [TelegramService],
  exports: [TelegramService], // для сущностей, в которых этот модуль реджектится
})
export class TelegramModule {}
