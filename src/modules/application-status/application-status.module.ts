import { Module } from '@nestjs/common';
import { ApplicationStatusService } from './application-status.service';
import { ApplicationStatus } from './application-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationStatus])],
  providers: [ApplicationStatusService],
})
export class ApplicationStatusModule {}
