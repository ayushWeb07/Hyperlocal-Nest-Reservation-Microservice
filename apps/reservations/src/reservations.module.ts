import { Module } from '@nestjs/common';
import { ReservationsService } from './services/reservations.service';
import { ReservationsController } from './reservations.controller';
import { ConfigModule, DatabaseModule } from '@app/common';
import { ReservationsRepository } from './repositories/reservations.repository';
import {
  ReservationDocument,
  ReservationSchema,
} from './schemas/reservation.schema';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
