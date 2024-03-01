import { ConfigService } from '@nestjs/config'; // env
import { TypegooseModuleOptions } from 'nestjs-typegoose';

// prettier-ignore
export const getMongoConfig = async ( configService: ConfigService): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};

const getMongoString = (configService: ConfigService) => {
  const url =
    'mongodb+srv://' +
    configService.get('MONGO_LOGIN') +
    ':' +
    configService.get('MONGO_PASSWORD') +
    '@' +
    configService.get('MONGO_HOST') +
    '/' +
    configService.get('MONGO_DATA_BASE');

  return url;
};

const getMongoOptions = () => {
  return {};
};
