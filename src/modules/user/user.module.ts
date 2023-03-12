import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FileModule } from '../file/file.module';
import { CommissionModule } from '../commission/commission.module';
import { ApplicantModule } from '../applicant/applicant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    FileModule,
    CommissionModule,
    ApplicantModule,
  ],
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
