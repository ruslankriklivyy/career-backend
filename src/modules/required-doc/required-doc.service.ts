import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { RequiredDoc } from './required-doc.entity';

@Injectable()
export class RequiredDocService {
  constructor(
    @InjectRepository(RequiredDoc)
    private readonly requiredDocRepository: Repository<RequiredDoc>,
  ) {}

  getAllByIds(ids: number[]) {
    return this.requiredDocRepository.find({ where: { id: In(ids) } });
  }
}
