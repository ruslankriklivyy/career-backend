import { Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacancy } from './vacancy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vacancy])],
  exports: [VacancyService],
  providers: [VacancyService],
})
export class VacancyModule {}
