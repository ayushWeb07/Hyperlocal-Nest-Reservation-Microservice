import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @Length(10, 10, { message: 'Password must be 10 characters long' })
  password: string;
}
