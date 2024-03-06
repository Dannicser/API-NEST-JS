import { index, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum TopLevelCategory {
  Courses = 'Courses',
  Services = 'Services',
  Books = 'Books',
  Products = 'Products',
}

export class HhData {
  @prop()
  count: number;

  @prop()
  juniorSalary: number;

  @prop()
  middleSalary: number;

  @prop()
  seniorSalary: number;
}

export class TopPageAdvatages {
  @prop()
  title: string;

  @prop()
  description: string;
}

export interface TopPageModel extends Base {}

//делаем ТЕКСТОВЫЕ ИНДЕКСЫ по двум полям
// @index({
//   title: 'text',
//   seoText: 'text',
// })
// в этом случае мы не сможешь создать индексы для элементов массива, поэтому объявляем весь документ индексом

@index({
  '$**': 'text', // весь документ
})
export class TopPageModel extends TimeStamps {
  @prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @prop()
  secondCategory: string;

  @prop() // { text: true } создает текстовый индекс на title - НО ТОЛЬКО ОДИН ИНДЕКС TYPEORM позволяет использовать
  title: string;

  @prop({ unique: true }) // любой unique - индекс в db
  alias: string;

  @prop()
  category: string; // по category будет подтягиваться сам Product

  @prop({ type: () => HhData })
  hh?: HhData;

  @prop({ type: () => [TopPageAdvatages] })
  advatages: TopPageAdvatages[]; // массив объектов

  @prop()
  seoText: string;

  @prop()
  tagsTitle: string;

  @prop({ type: () => [String] })
  tags: string[];
}
