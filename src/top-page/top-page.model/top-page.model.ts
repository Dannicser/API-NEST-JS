import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
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

export class TopPageModel extends TimeStamps {
  @prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @prop()
  secondCategory: string;

  @prop()
  title: string;

  @prop({ unique: true })
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
