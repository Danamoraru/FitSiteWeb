import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FitnessClass } from '../../fitness-classes/entities/fitness-class.entity.js';
import { Trainer } from '../../trainers/entities/trainer.entity.js';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  class_id: number;

  @Column()
  trainer_id: number;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => FitnessClass)
  @JoinColumn({ name: 'class_id' })
  fitnessClass: FitnessClass;

  @ManyToOne(() => Trainer)
  @JoinColumn({ name: 'trainer_id' })
  trainer: Trainer;
}