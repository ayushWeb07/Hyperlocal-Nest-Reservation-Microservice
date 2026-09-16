import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDocument } from '../schemas/user.schema';
import { UpdateUserBodyDto } from '../dtos/update-user-body.dto';
import * as bcrypt from 'bcrypt';
import { ValidateUserDto } from '../dtos/validate-user.dto';

@Injectable()
export class UsersService {
  private readonly saltRounds: number = 10;

  constructor(private readonly usersRepository: UsersRepository) {}

  async validateUser(validateUserDto: ValidateUserDto): Promise<UserDocument> {
    // check if the user exists
    const existingUser: UserDocument | null =
      await this.usersRepository.findOne({
        email: validateUserDto.email,
      });

    if (!existingUser) {
      throw new UnauthorizedException('Invalid credentials has been provided');
    }

    // check if the passwords are correct
    const passwordsMatch = await this.validatePassword(
      existingUser.password,
      validateUserDto.password,
    );

    if (!passwordsMatch) {
      throw new UnauthorizedException('Invalid credentials has been provided');
    }

    return existingUser;
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    // hash the password
    const hashedPassword = await this.hashPassword(createUserDto.password);

    // call the create repository function
    const doc: UserDocument = await this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
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

  async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.saltRounds);

    return hash;
  }

  async validatePassword(
    hashedPassword: string,
    rawPassword: string,
  ): Promise<boolean> {
    const passwordsMatch = await bcrypt.compare(rawPassword, hashedPassword);
    return passwordsMatch;
  }
}
