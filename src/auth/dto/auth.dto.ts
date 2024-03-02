import { IsEmail, IsString, Length } from 'class-validator';

export class AuthDto {
  @IsString({
    message: 'Не соответствует типу строки',
  })
  @IsEmail(undefined, {
    message: 'Не соотвeтствует формату email',
  })
  login: string;

  @Length(5, 20, {
    message: 'Пароль не может быть более 20 символов и менее 5',
  })
  @IsString({ message: 'Не соответствует типу строки' })
  password: string;
}
