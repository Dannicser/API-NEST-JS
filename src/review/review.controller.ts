import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { TelegramService } from 'src/telegram/telegram.service';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly telegramService: TelegramService, // при инджекте стороннего модуля не зываваем импортировать его импорты модуля
  ) {}

  @UsePipes(new ValidationPipe()) // валидация!!
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  //telegram
  @UsePipes(new ValidationPipe()) // валидация!!
  @Post('notify')
  async notify(@Body() dto: CreateReviewDto) {
    const message = `Имя: ${dto.name}\nЗаголовок: ${dto.title}\nОценка: ${dto.rating}\nТовар: ${dto.productId}`;
    return this.telegramService.sendMessage(message);
  }

  //защищаем роут
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedDoc = await this.reviewService.delete(id);

    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  //защищаем роут
  @UseGuards(JwtAuthGuard)
  @Get('byProduct/:productId')
  async byProduct(
    @Param('productId', IdValidationPipe) productId: string,
    @UserEmail() email: string, // собственный декоратор
  ) {
    return this.reviewService.findByProductId(productId);
  }
}
