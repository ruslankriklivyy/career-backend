import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContestService } from './contest.service';
import { ContestController } from './contest.controller';
import { Contest } from './contest.entity';
import { ContestStageModule } from '../contest-stage/contest-stage.module';
import { VacancyModule } from '../vacancy/vacancy.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contest]),
    ContestStageModule,
    VacancyModule,
  ],
  exports: [ContestService],
  providers: [ContestService],
  controllers: [ContestController],
})
export class ContestModule {}
