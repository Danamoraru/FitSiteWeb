import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity.js';
import { Schedule } from '../schedules/entities/schedule.entity.js';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,

    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
  ) {}

  async create(user_id: number, schedule_id: number) {
    const schedule = await this.scheduleRepo.findOneBy({
      id: schedule_id,
    });

    if (!schedule) {
      throw new NotFoundException('Programarea nu exista');
    }

    const existingBooking = await this.bookingRepo.findOne({
      where: {
        user_id,
        schedule_id,
      },
    });

    if (
      existingBooking &&
      existingBooking.status === BookingStatus.CONFIRMED
    ) {
      throw new BadRequestException(
        'Ai deja o rezervare pentru aceasta programare',
      );
    }

    const confirmedBookings = await this.bookingRepo.count({
      where: {
        schedule_id,
        status: BookingStatus.CONFIRMED,
      },
    });

    if (confirmedBookings >= schedule.capacity) {
      throw new BadRequestException('Nu mai sunt locuri disponibile');
    }

    if (
      existingBooking &&
      existingBooking.status === BookingStatus.CANCELLED
    ) {
      existingBooking.status = BookingStatus.CONFIRMED;

      return this.bookingRepo.save(existingBooking);
    }

    const booking = this.bookingRepo.create({
      user_id,
      schedule_id,
      status: BookingStatus.CONFIRMED,
    });

    return this.bookingRepo.save(booking);
  }

  findAll() {
    return this.bookingRepo.find({
      relations: {
        user: true,
        schedule: true,
      },
    });
  }

  async findOne(id: number) {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: {
        user: true,
        schedule: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Rezervarea nu exista');
    }

    return booking;
  }

  async cancel(id: number) {
    const booking = await this.findOne(id);

    booking.status = BookingStatus.CANCELLED;

    return this.bookingRepo.save(booking);
  }
}