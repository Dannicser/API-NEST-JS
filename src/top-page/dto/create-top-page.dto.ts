import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { HhData, TopLevelCategory } from '../top-page.model/top-page.model';
import { Type } from 'class-transformer';

class TopPageAdvatagesDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  @MinLength(2)
  description: string;
}

class HhDataDto {
  @IsNumber()
  count: number;

  @IsNumber()
  juniorSalary: number;

  @IsNumber()
  middleSalary: number;

  @IsNumber()
  seniorSalary: number;
}

export class CreateTopPageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;

  @MinLength(2)
  @IsString()
  secondCategory: string;

  @IsString()
  title: string;

  @IsString()
  alias: string;

  @IsString()
  category: string;

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => HhDataDto)
  hh?: HhData;

  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvatagesDto)
  advatages: TopPageAdvatagesDto[];
}
