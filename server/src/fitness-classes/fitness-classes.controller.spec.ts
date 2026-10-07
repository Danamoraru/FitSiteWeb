import { Test, TestingModule } from '@nestjs/testing';
import { FitnessClassesController } from './fitness-classes.controller.js';
import { FitnessClassesService } from './fitness-classes.service.js';

describe('FitnessClassesController', () => {
  let controller: FitnessClassesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FitnessClassesController],
      providers: [FitnessClassesService],
    }).compile();

    controller = module.get<FitnessClassesController>(FitnessClassesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
