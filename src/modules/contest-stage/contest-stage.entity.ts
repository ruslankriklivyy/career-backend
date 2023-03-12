import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Stage } from '../stage/stage.entity';
import { Contest } from '../contest/contest.entity';
import { ApplicationStage } from '../application-stage/application-stage.entity';

@Entity()
export class ContestStage extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ nullable: true })
  public start_date: string;

  @Column({ nullable: true })
  public end_date: string;

  @Column({ type: 'int', nullable: true })
  public order: number;

  @Column({ type: 'boolean', default: false })
  public is_current: boolean;

  @ManyToOne(() => Stage, (stage) => stage.contest_stages, { eager: true })
  @JoinColumn({ name: 'stage_id' })
  public stage: Stage;

  @ManyToOne(() => Contest, (contest) => contest.stages, {
    cascade: true,
  })
  @JoinColumn({ name: 'contest_id' })
  public contest: Contest;

  @OneToMany(
    () => ApplicationStage,
    (applicationStage) => applicationStage.contest_stage,
  )
  public applicationStages: ApplicationStage[];
}
