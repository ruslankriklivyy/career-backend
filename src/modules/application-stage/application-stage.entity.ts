import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { State } from '../state/state.entity';
import { City } from '../city/city.entity';
import { ContestStage } from '../contest-stage/contest-stage.entity';
import { Application } from '../application/application.entity';
import { ApplicationStageStatus } from '../application-stage-status/application-stage-status.entity';

@Entity()
export class ApplicationStage extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ nullable: true })
  public address: string;

  @Column({ nullable: true })
  public date: string;

  @Column({ nullable: true })
  public report: string;

  @ManyToOne(() => Application, (application) => application.application_stages)
  @JoinColumn({ name: 'application_id' })
  public application: Application;

  @ManyToOne(
    () => ApplicationStageStatus,
    (applicationStageStatus) => applicationStageStatus.applicationStages,
    { eager: true },
  )
  @JoinColumn({ name: 'status_id' })
  public status: ApplicationStageStatus;

  @ManyToOne(
    () => ContestStage,
    (contestStage) => contestStage.applicationStages,
    { eager: true },
  )
  @JoinColumn({ name: 'contest_stage_id' })
  public contest_stage: ContestStage;

  @ManyToOne(() => State, (state) => state.vacancies, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'state_id' })
  public state: State;

  @ManyToOne(() => City, (city) => city.vacancies, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'city_id' })
  public city: City;
}
