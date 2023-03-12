import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApplicationStage } from '../application-stage/application-stage.entity';
import { ContestStage } from '../contest-stage/contest-stage.entity';
import { Vacancy } from '../vacancy/vacancy.entity';
import { File } from '../file/file.entity';
import { Applicant } from '../applicant/applicant.entity';
import { ApplicationStatus } from '../application-status/application-status.entity';

@Entity()
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @OneToMany(
    () => ApplicationStage,
    (applicationStage) => applicationStage.application,
    { eager: true, cascade: true },
  )
  public application_stages: ApplicationStage[];

  @OneToMany(() => File, (file) => file.application, {
    eager: true,
  })
  public files: File[];

  @OneToOne(() => ContestStage, { eager: true })
  @JoinColumn({ name: 'contest_stage_id' })
  public contest_stage: ContestStage;

  @ManyToOne(
    () => ApplicationStatus,
    (applicationStatus) => applicationStatus.applications,
    { eager: true },
  )
  @JoinColumn({ name: 'status_id' })
  public status: ApplicationStatus;

  @ManyToOne(() => Vacancy, (vacancy) => vacancy.applications, { eager: true })
  @JoinColumn({ name: 'vacancy_id' })
  public vacancy: Vacancy;

  @ManyToOne(() => Applicant, (applicant) => applicant.applications)
  @JoinColumn({ name: 'applicant_id' })
  public applicant: Applicant;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
