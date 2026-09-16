import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';

export class ValidateUserDto {
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
