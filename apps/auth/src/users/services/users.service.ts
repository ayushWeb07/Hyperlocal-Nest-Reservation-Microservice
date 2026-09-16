import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDocument } from '../schemas/user.schema';
import { UpdateUserBodyDto } from '../dtos/update-user-body.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    // call the create repository function
    const doc: UserDocument = await this.usersRepository.create(createUserDto);
    return doc;
  }

  async findAll(): Promise<UserDocument[]> {
    // call the find all repository function
    const docs: UserDocument[] = await this.usersRepository.findMany();
    return docs;
  }

  async findById(id: string): Promise<UserDocument> {
    // call the find by id repository function
    const doc: UserDocument | null = await this.usersRepository.findById(id);

    if (!doc) {
      throw new NotFoundException(
        `User with id '${id}' does not exist or got deleted`,
      );
    }

    return doc;
  }

  async update(
    id: string,
    updateUserBodyDto: UpdateUserBodyDto,
  ): Promise<UserDocument> {
    // call the findOneAndUpdate repository function
    const doc: UserDocument | null =
      await this.usersRepository.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: updateUserBodyDto,
        },
      );

    if (!doc) {
      throw new NotFoundException(
        `User with id '${id}' does not exist or got deleted`,
      );
    }

    return doc;
  }

  async remove(id: string): Promise<UserDocument> {
    // call the findOneAndDelete repository function
    const doc: UserDocument | null =
      await this.usersRepository.findOneAndDelete({
        _id: id,
      });

    if (!doc) {
      throw new NotFoundException(`User with id '${id}' does not exist`);
    }

    return doc;
  }
}
