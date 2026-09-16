import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { DatabaseModule } from '@app/common';
import { UserDocument, UserSchema } from './schemas/user.schema';
import { UsersRepository } from './repositories/users.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
