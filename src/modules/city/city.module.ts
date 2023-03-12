import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  providers: [CityService],
})
export class CityModule {}
