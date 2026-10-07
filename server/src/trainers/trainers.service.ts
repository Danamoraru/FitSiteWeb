import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainer } from './entities/trainer.entity.js';

@Injectable()
export class TrainersService {
  constructor(
    @InjectRepository(Trainer)
    private readonly repo: Repository<Trainer>,
  ) {}

  create(data: Partial<Trainer>) {
    const trainer = this.repo.create(data);
    return this.repo.save(trainer);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const trainer = await this.repo.findOneBy({ id });

    if (!trainer) {
      throw new NotFoundException('Antrenorul nu exista');
    }

    return trainer;
  }

  async update(id: number, data: Partial<Trainer>) {
    const trainer = await this.findOne(id);
    Object.assign(trainer, data);
    return this.repo.save(trainer);
  }

  async remove(id: number) {
    const trainer = await this.findOne(id);
    await this.repo.remove(trainer);

    return { message: 'Antrenorul a fost sters' };
  }
}