import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity.js';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly repo: Repository<Review>,
  ) {}

  async create(data: Partial<Review>) {
    if (!data.rating || data.rating < 1 || data.rating > 5) {
      throw new BadRequestException(
        'Ratingul trebuie sa fie intre 1 si 5',
      );
    }

    const review = this.repo.create(data);
    return this.repo.save(review);
  }

  findAll() {
    return this.repo.find({
      relations: {
        user: true,
        fitnessClass: true,
      },
    });
  }

  async findOne(id: number) {
    const review = await this.repo.findOne({
      where: { id },
      relations: {
        user: true,
        fitnessClass: true,
      },
    });

    if (!review) {
      throw new NotFoundException('Recenzia nu exista');
    }

    return review;
  }

  async remove(id: number) {
    const review = await this.findOne(id);
    await this.repo.remove(review);

    return { message: 'Recenzia a fost stearsa' };
  }
}