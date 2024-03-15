import { ModuleMetadata } from '@nestjs/common'; // включает imports, controllers, providers, exports

export interface ITelegramOptions {
  chatId: string;
  token: string;
}

// prettier-ignore
export interface ITelegramModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args:any[]) => Promise<ITelegramOptions> | ITelegramOptions
  inject?: any[]
}
