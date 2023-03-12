import { Module } from '@nestjs/common';
import { ContestStageService } from './contest-stage.service';
import { ContestStageController } from './contest-stage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContestStage } from './contest-stage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContestStage])],
  exports: [ContestStageService],
  providers: [ContestStageService],
  controllers: [ContestStageController],
})
export class ContestStageModule {}
