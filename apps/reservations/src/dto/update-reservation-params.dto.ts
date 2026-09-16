import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateReservationParamsDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
