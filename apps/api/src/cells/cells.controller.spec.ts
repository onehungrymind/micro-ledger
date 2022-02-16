import { Test, TestingModule } from '@nestjs/testing';
import { CellsController } from './cells.controller';
import { CellsService } from './cells.service';

const mockCellsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  initHealthCheck: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn()
}

describe('CellsController', () => {
  let controller: CellsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CellsController],
      providers: [
        { provide: CellsService, useValue: mockCellsService }
      ],
    }).compile();

    controller = module.get<CellsController>(CellsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
