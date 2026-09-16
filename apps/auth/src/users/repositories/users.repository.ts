import { AbstractRepository } from '@app/common/database/abstract.repository';
import { UserDocument } from '../schemas/user.schema';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository extends AbstractRepository<UserDocument> {
  private readonly logger: Logger;

  constructor(
    @InjectModel(UserDocument.name)
    userModel: Model<UserDocument>,
  ) {
    super(userModel);

    this.logger = new Logger(UsersRepository.name);
  }
}
