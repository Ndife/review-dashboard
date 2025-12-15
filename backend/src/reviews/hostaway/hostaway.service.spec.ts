import { Test, TestingModule } from '@nestjs/testing';
import { HostawayService } from './hostaway.service';

describe('HostawayService', () => {
  let service: HostawayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HostawayService],
    }).compile();

    service = module.get<HostawayService>(HostawayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
