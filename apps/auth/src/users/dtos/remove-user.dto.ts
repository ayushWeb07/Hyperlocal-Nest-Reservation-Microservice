import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class RemoveUserDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
