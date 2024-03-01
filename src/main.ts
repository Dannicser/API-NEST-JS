import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // установка префикса для http запросов
  await app.listen(PORT, () => console.log('server has been started on', PORT));
}

bootstrap();

//точка входа в прилож
