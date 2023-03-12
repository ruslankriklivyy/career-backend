import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RequiredDocService } from './required-doc.service';
import { RequiredDocController } from './required-doc.controller';
import { RequiredDoc } from './required-doc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequiredDoc])],
  exports: [RequiredDocService],
  providers: [RequiredDocService],
  controllers: [RequiredDocController],
})
export class RequiredDocModule {}
