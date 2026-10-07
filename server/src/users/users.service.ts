import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  create(data: Partial<User>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const user = await this.repo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Utilizatorul nu exista');
    }

    return user;
  }

  findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async update(id: number, data: Partial<User>) {
    const user = await this.findOne(id);

    Object.assign(user, data);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    await this.repo.remove(user);

    return { message: 'Utilizatorul a fost sters' };
  }
}