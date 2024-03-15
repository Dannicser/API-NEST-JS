import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; // env
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './configs/mongo.config';
import { FilesModule } from './files/files.module';
import { TelegramModule } from './telegram/telegram.module';
import { getTelegramConfig } from './configs/telegram.config';

@Module({
  imports: [
    AuthModule,
    TopPageModule,
    ProductModule,
    ReviewModule,
    ConfigModule.forRoot(), // env
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig, // тут получаем env
    }),
    FilesModule,

    // кастомный forRootAsync
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegramConfig, // тут получаем env
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
