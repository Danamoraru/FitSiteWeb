import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service.js';
import { BookingsController } from './bookings.controller.js';
import { Booking } from './entities/booking.entity.js';
import { Schedule } from '../schedules/entities/schedule.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Schedule]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}