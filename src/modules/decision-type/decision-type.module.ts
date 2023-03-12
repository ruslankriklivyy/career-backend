import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DecisionTypeService } from './decision-type.service';
import { DecisionType } from './decision-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DecisionType])],
  providers: [DecisionTypeService],
})
export class DecisionTypeModule {}
