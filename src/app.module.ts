import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import * as Joi from 'joi';

import { TypeOrmConfigService } from 'src/shared/typeorm/typeorm.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';
import { FileModule } from './modules/file/file.module';
import { MulterService } from './shared/multer/multer.service';
import { CommissionModule } from './modules/commission/commission.module';
import { ContestModule } from './modules/contest/contest.module';
import { ContestStatusModule } from './modules/contest-status/contest-status.module';
import { ContestStageModule } from './modules/contest-stage/contest-stage.module';
import { StageModule } from './modules/stage/stage.module';
import { VacancyModule } from './modules/vacancy/vacancy.module';
import { CityModule } from './modules/city/city.module';
import { StateModule } from './modules/state/state.module';
import { RequiredDocModule } from './modules/required-doc/required-doc.module';
import { ApplicationModule } from './modules/application/application.module';
import { ApplicationStageModule } from './modules/application-stage/application-stage.module';
import { ApplicationStatusModule } from './modules/application-status/application-status.module';
import { ApplicantModule } from './modules/applicant/applicant.module';
import { ApplicationStageStatusModule } from './modules/application-stage-status/application-stage-status.module';
import { DecisionModule } from './modules/decision/decision.module';
import { DecisionTypeModule } from './modules/decision-type/decision-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    MulterModule.registerAsync({
      useClass: MulterService,
    }),
    UserModule,
    AuthModule,
    TokenModule,
    FileModule,
    CommissionModule,
    ContestModule,
    ContestStatusModule,
    ContestStageModule,
    StageModule,
    VacancyModule,
    CityModule,
    StateModule,
    RequiredDocModule,
    ApplicationModule,
    ApplicationStageModule,
    ApplicationStatusModule,
    ApplicantModule,
    ApplicationStageStatusModule,
    DecisionModule,
    DecisionTypeModule,
  ],
})
export class AppModule {}
