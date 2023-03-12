import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  providers: [StateService],
})
export class StateModule {}
