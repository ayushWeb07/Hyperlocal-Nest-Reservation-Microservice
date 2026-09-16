import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class FindByIdReservationDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
