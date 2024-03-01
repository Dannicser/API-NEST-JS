import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { AuthModel } from './auth.model/auth.model';
import { InjectModel } from 'nestjs-typegoose';

import { genSaltSync, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  // инжектим модель
  constructor(
    @InjectModel(AuthModel) private readonly authModel: ModelType<AuthModel>,
  ) {}

  async createUser(dto: AuthDto) {
    const salt = genSaltSync(10);
    const passwordHash = await hash(dto.password, salt);

    const newUser = new this.authModel({
      email: dto.login,
      passwordHash,
    });

    return newUser.save();
  }

  async findUser(email: string) {
    return this.authModel
      .findOne({
        email,
      })
      .exec();
  }
}
