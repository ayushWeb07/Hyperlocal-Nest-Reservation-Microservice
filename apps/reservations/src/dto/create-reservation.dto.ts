import { IsDate, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsDate()
  @IsDefined()
  startDate: Date;

  @IsDate()
  @IsDefined()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  invoiceId: string;
}
