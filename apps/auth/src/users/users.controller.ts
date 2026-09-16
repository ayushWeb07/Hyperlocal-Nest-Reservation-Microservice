import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDocument } from './schemas/user.schema';
import { FindByIdUserDto } from './dtos/find-by-id-user.dto';
import { UpdateUserParamsDto } from './dtos/update-user-params.dto';
import { UpdateUserBodyDto } from './dtos/update-user-body.dto';
import { RemoveUserDto } from './dtos/remove-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    // call the create service function
    const createdUser: UserDocument =
      await this.usersService.create(createUserDto);

    return {
      success: true,
      message: `Successfully created the new user`,
      data: { ...createdUser },
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    // call the find all service function
    const existingUsers: UserDocument[] = await this.usersService.findAll();

    return {
      success: true,
      message: `Successfully fetched all the users`,
      data: existingUsers,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param() findByIdUserDto: FindByIdUserDto) {
    // call the find by id service function
    const existingUser: UserDocument = await this.usersService.findById(
      findByIdUserDto.id,
    );

    return {
      success: true,
      message: `Successfully fetched the user by id`,
      data: { ...existingUser },
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param() updateUserParamsDto: UpdateUserParamsDto,
    @Body() updateUserBodyDto: UpdateUserBodyDto,
  ) {
    // call the update service function
    const updatedUser: UserDocument = await this.usersService.update(
      updateUserParamsDto.id,
      updateUserBodyDto,
    );

    return {
      success: true,
      message: `Successfully updated the existing user`,
      data: { ...updatedUser },
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param() removeUserDto: RemoveUserDto) {
    // call the remove service function
    const removedUser: UserDocument = await this.usersService.remove(
      removeUserDto.id,
    );

    return {
      success: true,
      message: `Successfully removed the existing user`,
      data: { ...removedUser },
    };
  }
}
