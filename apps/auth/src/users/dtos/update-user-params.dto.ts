import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserParamsDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
