import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('fitness_classes')
export class FitnessClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int' })
  duration_minutes: number;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ nullable: true })
  level: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}