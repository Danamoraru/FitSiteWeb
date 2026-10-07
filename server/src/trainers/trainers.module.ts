import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainersService } from './trainers.service.js';
import { TrainersController } from './trainers.controller.js';
import { Trainer } from './entities/trainer.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Trainer])],
  controllers: [TrainersController],
  providers: [TrainersService],
})
export class TrainersModule {}