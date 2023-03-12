import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ContestStatus } from './contest-status.entity';

@Injectable()
export class ContestStatusService {
  constructor(
    @InjectRepository(ContestStatus)
    private readonly contestStatusRepository: Repository<ContestStatus>,
  ) {}

  getAll() {
    return this.contestStatusRepository.find();
  }

  getOne(id: number) {
    return this.contestStatusRepository.findOneBy({ id });
  }
}
