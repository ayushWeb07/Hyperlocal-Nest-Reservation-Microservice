import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveReservationDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
