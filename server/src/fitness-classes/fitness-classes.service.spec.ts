import { Test, TestingModule } from '@nestjs/testing';
import { FitnessClassesService } from './fitness-classes.service.js';

describe('FitnessClassesService', () => {
  let service: FitnessClassesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FitnessClassesService],
    }).compile();

    service = module.get<FitnessClassesService>(FitnessClassesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
