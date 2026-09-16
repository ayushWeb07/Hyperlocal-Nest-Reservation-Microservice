import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ReservationsService } from './services/reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationBodyDto } from './dto/update-reservation-body.dto';
import { ReservationDocument } from './schemas/reservation.schema';
import { FindByIdReservationDto } from './dto/find-by-id-reservation.dto';
import { UpdateReservationParamsDto } from './dto/update-reservation-params.dto';
import { RemoveReservationDto } from './dto/remove-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createReservationDto: CreateReservationDto) {
    // call the create service function
    const createdReservation: ReservationDocument =
      await this.reservationsService.create(createReservationDto);

    return {
      success: true,
      message: `Successfully created the new reservation`,
      data: { ...createdReservation },
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    // call the find all service function
    const existingReservations: ReservationDocument[] =
      await this.reservationsService.findAll();

    return {
      success: true,
      message: `Successfully fetched all the reservations`,
      data: existingReservations,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param() findByIdReservationDto: FindByIdReservationDto) {
    // call the find by id service function
    const existingReservation: ReservationDocument =
      await this.reservationsService.findById(findByIdReservationDto.id);

    return {
      success: true,
      message: `Successfully fetched the reservation by id`,
      data: { ...existingReservation },
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param() updateReservationParamsDto: UpdateReservationParamsDto,
    @Body() updateReservationBodyDto: UpdateReservationBodyDto,
  ) {
    // call the update service function
    const updatedReservation: ReservationDocument =
      await this.reservationsService.update(
        updateReservationParamsDto.id,
        updateReservationBodyDto,
      );

    return {
      success: true,
      message: `Successfully updated the existing reservation`,
      data: { ...updatedReservation },
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param() removeReservationDto: RemoveReservationDto) {
    // call the remove service function
    const removedReservation: ReservationDocument =
      await this.reservationsService.remove(removeReservationDto.id);

    return {
      success: true,
      message: `Successfully removed the existing reservation`,
      data: { ...removedReservation },
    };
  }
}
