import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity.js';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private readonly repo: Repository<Schedule>,
  ) {}

  create(data: Partial<Schedule>) {
    const schedule = this.repo.create(data);
    return this.repo.save(schedule);
  }

  findAll() {
    return this.repo.find({
      relations: {
        fitnessClass: true,
        trainer: true,
      },
    });
  }

  async findOne(id: number) {
    const schedule = await this.repo.findOne({
      where: { id },
      relations: {
        fitnessClass: true,
        trainer: true,
      },
    });

    if (!schedule) {
      throw new NotFoundException('Programul nu exista');
    }

    return schedule;
  }

  async update(id: number, data: Partial<Schedule>) {
    const schedule = await this.findOne(id);

    Object.assign(schedule, data);

    return this.repo.save(schedule);
  }

  async remove(id: number) {
    const schedule = await this.findOne(id);

    await this.repo.remove(schedule);

    return { message: 'Programul a fost sters' };
  }
}