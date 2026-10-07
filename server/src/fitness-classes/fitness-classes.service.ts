import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FitnessClass } from './entities/fitness-class.entity.js';

@Injectable()
export class FitnessClassesService {
  constructor(
    @InjectRepository(FitnessClass)
    private readonly repo: Repository<FitnessClass>,
  ) {}

  create(data: Partial<FitnessClass>) {
    const fitnessClass = this.repo.create(data);
    return this.repo.save(fitnessClass);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const item = await this.repo.findOneBy({ id });
    if (!item) throw new NotFoundException('Clasa nu există');
    return item;
  }

  async update(id: number, data: Partial<FitnessClass>) {
    const item = await this.findOne(id);
    Object.assign(item, data);
    return this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    await this.repo.remove(item);
    return { message: 'Clasa a fost ștearsă' };
  }
}