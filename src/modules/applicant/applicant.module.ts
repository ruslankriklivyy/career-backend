import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicantService } from './applicant.service';
import { Applicant } from './applicant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Applicant])],
  exports: [ApplicantService],
  providers: [ApplicantService],
})
export class ApplicantModule {}
