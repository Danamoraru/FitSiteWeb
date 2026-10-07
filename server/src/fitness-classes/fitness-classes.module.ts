import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FitnessClassesService } from './fitness-classes.service.js';
import { FitnessClassesController } from './fitness-classes.controller.js';
import { FitnessClass } from './entities/fitness-class.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([FitnessClass])],
  controllers: [FitnessClassesController],
  providers: [FitnessClassesService],
})
export class FitnessClassesModule {}