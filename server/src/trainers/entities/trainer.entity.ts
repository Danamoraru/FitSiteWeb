import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('trainers')
export class Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  specialization: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  photo_url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
