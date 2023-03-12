import { Module } from '@nestjs/common';
import { CommissionService } from './commission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commission } from './commission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commission])],
  exports: [CommissionService],
  providers: [CommissionService],
})
export class CommissionModule {}
