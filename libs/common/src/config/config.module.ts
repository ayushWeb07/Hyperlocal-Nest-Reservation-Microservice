import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import envsValidation from './validations/envs.validation';
import serverConfig from './server.config';
import databaseConfig from './database.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envsValidation,
      load: [serverConfig, databaseConfig],
    }),
  ],
})
export class ConfigModule {}
