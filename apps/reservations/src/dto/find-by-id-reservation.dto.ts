import { IsNotEmpty, IsString } from 'class-validator';

export class FindByIdReservationDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
