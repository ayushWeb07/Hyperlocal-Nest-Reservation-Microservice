import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig } from '@app/common/config/interfaces/database_config.interface';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // get the database config
        const databaseConfig = configService.get<IDatabaseConfig>('database');

        if (!databaseConfig) {
          throw new Error('Database configuration must be setup');
        }

        return {
          uri: databaseConfig.mongoUri,
        };
      },
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
