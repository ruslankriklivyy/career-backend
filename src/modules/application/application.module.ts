import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { Application } from './application.entity';
import { VacancyModule } from '../vacancy/vacancy.module';
import { ApplicantModule } from '../applicant/applicant.module';
import { ApplicationStageModule } from '../application-stage/application-stage.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application]),
    VacancyModule,
    ApplicantModule,
    ApplicationStageModule,
    FileModule,
  ],
  providers: [ApplicationService],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
