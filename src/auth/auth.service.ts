import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { AuthModel } from './auth.model/auth.model';
import { InjectModel } from 'nestjs-typegoose';

import { compare, genSaltSync, hash } from 'bcrypt';
import { USER_NOT_FOUND, USER_WRONG_PASSWORD } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // инжектим модель
  // инжектим модуль
  constructor(
    @InjectModel(AuthModel) private readonly authModel: ModelType<AuthModel>,
    private readonly jwtService: JwtService,
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

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<AuthModel, 'email'>> {
    const user = await this.findUser(email);

    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND);
    }

    const isCorrectPassword = await compare(password, user.passwordHash); // 1 - что, 2 - с чем

    if (!isCorrectPassword) {
      throw new UnauthorizedException(USER_WRONG_PASSWORD);
    }

    return {
      email: user.email,
    };
  }

  async login(email: string) {
    const payload = { email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
