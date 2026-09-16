import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class RemoveReservationDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
