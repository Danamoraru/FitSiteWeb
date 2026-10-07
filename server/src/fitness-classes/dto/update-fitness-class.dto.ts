import { PartialType } from '@nestjs/mapped-types';
import { CreateFitnessClassDto } from './create-fitness-class.dto.js';

export class UpdateFitnessClassDto extends PartialType(CreateFitnessClassDto) {}
