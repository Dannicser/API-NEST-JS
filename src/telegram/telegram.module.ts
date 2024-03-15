import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ITelegramModuleAsyncOptions } from './telegram.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';

@Global() // чтобы не инджектить в других модулях (только один раз в app модуле)
@Module({})
export class TelegramModule {
  static forRootAsync(options: ITelegramModuleAsyncOptions): DynamicModule {
    const asyncOptions = this.createAsyncOptionsProvider(options);

    return {
      module: TelegramModule,
      imports: options.imports,
      providers: [TelegramService, asyncOptions], // что попадет в дерево зависимостей nest
      exports: [TelegramService],
    };
  }

  private static createAsyncOptionsProvider(
    options: ITelegramModuleAsyncOptions,
  ): Provider {
    return {
      provide: TELEGRAM_MODULE_OPTIONS, // !!!
      useFactory: async (...args: any[]) => {
        const config = await options.useFactory(...args); // возвращает конфиг

        return config;
      },
      inject: options.inject || [],
    };
  }
}
