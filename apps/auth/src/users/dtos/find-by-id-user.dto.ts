import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class FindByIdUserDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
