import { Module } from '@nestjs/common';
import { ApplicationStageService } from './application-stage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationStage } from './application-stage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationStage])],
  exports: [ApplicationStageService],
  providers: [ApplicationStageService],
})
export class ApplicationStageModule {}
