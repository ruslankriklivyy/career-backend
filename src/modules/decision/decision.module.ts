import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DecisionService } from './decision.service';
import { DecisionController } from './decision.controller';
import { Decision } from './decision.entity';
import { ContestModule } from '../contest/contest.module';
import { VacancyModule } from '../vacancy/vacancy.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Decision]),
    ContestModule,
    VacancyModule,
    FileModule,
  ],
  providers: [DecisionService],
  controllers: [DecisionController],
})
export class DecisionModule {}
