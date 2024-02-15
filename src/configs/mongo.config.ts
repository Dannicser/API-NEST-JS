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
  return (
    'mongodb://' +
    configService.get('MONGO_LOGIN') +
    ':' +
    configService.get('MONGO_PASSWORD') +
    '@' +
    configService.get('MONGO_HOST') +
    ':' +
    configService.get('MONGO_PORT') +
    '/' +
    configService.get('MONGO_DATA_BASE')
  );
};

const getMongoOptions = () => {
  return {};
};
