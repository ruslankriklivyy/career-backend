import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Commission } from './commission.entity';
import { Repository } from 'typeorm';
import { ICreateCommissionPayload } from './commission.interface';

@Injectable()
export class CommissionService {
  constructor(
    @InjectRepository(Commission)
    private readonly commissionRepository: Repository<Commission>,
  ) {}

  getAll() {
    return this.commissionRepository.find();
  }

  getOne(id: number) {
    return this.commissionRepository.findOneBy({ id });
  }

  createOne(payload: ICreateCommissionPayload) {
    return this.commissionRepository.save(payload);
  }
}
