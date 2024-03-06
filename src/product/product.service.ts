import { InjectModel } from 'nestjs-typegoose';

import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';

import { ProductModel } from './product.model/product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel)
    private readonly productModel: ModelType<ProductModel>,
  ) {}

  async create(dto: CreateProductDto) {
    return this.productModel.create(dto);
  }

  async findById(id: string) {
    return this.productModel.findById(id);
  }

  async deleteById(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateProductDto) {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec(); // по дефолту возвращает старую версию записи - new: true - помогает
  }

  // вытаскиваем продукты по категории вместе с отзывами продукта
  async findWithReviews(dto: FindProductDto) {
    return this.productModel.aggregate([
      // 1 - pipeline
      {
        $match: {
          categories: dto.category, // соберет все записи где в массиве категорий есть строка dto.category
        },
      },
      // 2 - pipeline
      {
        $sort: {
          _id: 1, // делаю стабильную сортировку - необходимо всегда сортировать одинаково, иначе будут выдаваться разные таблицы при лимите
        },
      },
      // 3 - pipeline
      {
        $limit: dto.limit,
      },
      // 4 - pipeline
      // lookup агрегация с другой коллект, подтягивает данные из другой коллекции
      {
        $lookup: {
          from: 'Review', // из какой колленции
          localField: '_id', // поле по которому делаем агрегацию
          foreignField: 'productId', // поле по которому будем искать
          as: 'reviews', // результирующее поле
        },
      },
      // 5 - pipeline
      {
        $addFields: {
          reviewCount: {
            $size: '$reviews', // ссылаемся на ранее полученную таблицу и получаем длинну массива
          },
          reviewAvg: {
            $avg: '$reviews.rating',
          },
          // reviews: {
          //   $function: {
          //     body: `function (review) {
          //       review.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          //       return review;
          //     }`,
          //     args: ['$reviews'], // закидываем все ревью
          //   },
          // },
        },
      },
    ]);
  }
}

// review: ReviewModel[];
// reviewCount: number;
// reviewAvg: number;
