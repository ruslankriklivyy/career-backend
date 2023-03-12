import { Module } from '@nestjs/common';
import { ApplicationStageStatusService } from './application-stage-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationStageStatus } from './application-stage-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationStageStatus])],
  providers: [ApplicationStageStatusService],
})
export class ApplicationStageStatusModule {}
