import { IsString, IsNumber, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @Max(5, { message: 'Оценка не может быть более 5 баллов' })
  @Min(1, { message: 'Оценка не может менее 1 балла' })
  @IsNumber()
  rating: number;

  @IsString()
  productId: string;
}
