import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateReservationParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
