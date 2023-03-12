import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Applicant } from './applicant.entity';
import { Repository } from 'typeorm';
import { ApplicantDto } from './dto/applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';

@Injectable()
export class ApplicantService {
  constructor(
    @InjectRepository(Applicant)
    private readonly applicantRepository: Repository<Applicant>,
  ) {}

  getOne(id: number) {
    return this.applicantRepository.findOne({ where: { id } });
  }

  createOne(payload) {
    const newApplicant = new ApplicantDto({
      ...payload,
      user: { id: payload.id },
    });
    return this.applicantRepository.save(newApplicant);
  }

  updateOne(id: number, payload) {
    const newApplicant = new UpdateApplicantDto({ ...payload });
    return this.applicantRepository.save(newApplicant);
  }
}
