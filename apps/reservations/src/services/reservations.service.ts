import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationBodyDto } from '../dto/update-reservation-body.dto';
import { ReservationsRepository } from '../repositories/reservations.repository';
import { ReservationDocument } from '../schemas/reservation.schema';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<ReservationDocument> {
    // call the create repository function
    const doc: ReservationDocument =
      await this.reservationsRepository.create(createReservationDto);
    return doc;
  }

  async findAll() {
    // call the find all repository function
    const docs: ReservationDocument[] =
      await this.reservationsRepository.findMany();
    return docs;
  }

  async findById(id: string): Promise<ReservationDocument> {
    // call the find by id repository function
    const doc: ReservationDocument | null =
      await this.reservationsRepository.findById(id);

    if (!doc) {
      throw new NotFoundException(
        `Reservation with id '${id}' does not exist or got deleted`,
      );
    }

    return doc;
  }

  async update(
    id: string,
    updateReservationDto: UpdateReservationBodyDto,
  ): Promise<ReservationDocument> {
    // call the findOneAndUpdate repository function
    const doc: ReservationDocument | null =
      await this.reservationsRepository.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: updateReservationDto,
        },
      );

    if (!doc) {
      throw new NotFoundException(
        `Reservation with id '${id}' does not exist or got deleted`,
      );
    }

    return doc;
  }

  async remove(id: string): Promise<ReservationDocument> {
    // call the findOneAndDelete repository function
    const doc: ReservationDocument | null =
      await this.reservationsRepository.findOneAndDelete({
        _id: id,
      });

    if (!doc) {
      throw new NotFoundException(`Reservation with id '${id}' does not exist`);
    }

    return doc;
  }
}
