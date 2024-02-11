import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // установка префикса для http запросов
  await app.listen(3000);
}
bootstrap();

//точка входа в прилож
