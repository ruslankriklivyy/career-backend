import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ApplicationStage } from './application-stage.entity';
import { ApplicationStageDto } from './dto/application-stage.dto';

@Injectable()
export class ApplicationStageService {
  constructor(
    @InjectRepository(ApplicationStage)
    private readonly applicationStageRepository: Repository<ApplicationStage>,
  ) {}

  createOne(payload) {
    const newApplicationStage = new ApplicationStageDto({ ...payload });
    return this.applicationStageRepository.save(newApplicationStage);
  }
}
