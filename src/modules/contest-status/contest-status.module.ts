import { Module } from '@nestjs/common';
import { ContestStatusService } from './contest-status.service';
import { ContestStatusController } from './contest-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContestStatus } from './contest-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContestStatus])],
  exports: [ContestStatusService],
  providers: [ContestStatusService],
  controllers: [ContestStatusController],
})
export class ContestStatusModule {}
