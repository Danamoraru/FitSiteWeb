import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { TrainersModule } from './trainers/trainers.module.js';
import { AppService } from './app.service.js';
import { FitnessClassesModule } from './fitness-classes/fitness-classes.module.js';
import { SchedulesModule } from './schedules/schedules.module.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { BookingsModule } from './bookings/bookings.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'fitbook',
      password: 'fitbook123',
      database: 'fitbook_db',
      autoLoadEntities: true,
      synchronize: false,
    }),
    FitnessClassesModule,
    TrainersModule,
    SchedulesModule,
    UsersModule,
    AuthModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }