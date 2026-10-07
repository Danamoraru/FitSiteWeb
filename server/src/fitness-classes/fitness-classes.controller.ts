import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, ParseIntPipe,
} from '@nestjs/common';
import { FitnessClassesService } from './fitness-classes.service.js';
import { FitnessClass } from './entities/fitness-class.entity.js';

@Controller('fitness-classes')
export class FitnessClassesController {
  constructor(private readonly service: FitnessClassesService) {}

  @Post()
  create(@Body() data: Partial<FitnessClass>) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<FitnessClass>,
  ) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}