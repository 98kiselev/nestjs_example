import { Test, TestingModule } from '@nestjs/testing';
import { DeadlineController } from './deadline.controller';
import { DeadlineService } from './deadline.service';

describe('DeadlineController', () => {
  let controller: DeadlineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeadlineController],
      providers: [DeadlineService],
    }).compile();

    controller = module.get<DeadlineController>(DeadlineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
