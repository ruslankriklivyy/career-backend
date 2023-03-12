import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ContestStatus } from '../contest-status/contest-status.entity';
import { ContestStage } from '../contest-stage/contest-stage.entity';
import { Vacancy } from '../vacancy/vacancy.entity';
import { Commission } from '../commission/commission.entity';
import { RequiredDoc } from '../required-doc/required-doc.entity';
import { Decision } from '../decision/decision.entity';

@Entity()
export class Contest extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public email: string;

  @Column()
  public address: string;

  @Column()
  public name: string;

  @Column()
  public start_date: string;

  @Column()
  public end_date: string;

  @Column()
  public terms: string;

  @Column()
  public description: string;

  @Column()
  public conditions: string;

  @OneToOne(() => ContestStage, { eager: true, cascade: true })
  @JoinColumn({ name: 'current_contest_stage_id' })
  public current_contest_stage: ContestStage;

  @ManyToOne(() => Commission, (commission) => commission.id, { eager: true })
  @JoinColumn({ name: 'commission_id' })
  public commission: Commission;

  @ManyToOne(() => ContestStatus, (contestStatus) => contestStatus.contests, {
    eager: true,
  })
  @JoinColumn({ name: 'contest_status_id' })
  public contest_status: ContestStatus;

  @OneToMany(() => ContestStage, (contestStage) => contestStage.contest, {
    eager: true,
  })
  public stages: ContestStage[];

  @OneToMany(() => Vacancy, (vacancy) => vacancy.contest, { eager: true })
  public vacancies: Vacancy[];

  @ManyToMany(() => RequiredDoc, (requiredDoc) => requiredDoc.id, {
    eager: true,
  })
  @JoinTable({
    name: 'required_doc_contest',
    joinColumn: { name: 'contest_id' },
    inverseJoinColumn: {
      name: 'required_doc_id',
    },
  })
  public required_docs: RequiredDoc[];

  @OneToMany(() => Decision, (decision) => decision.contest)
  public decisions: Decision[];

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

  @AfterLoad()
  updateCurrentStage() {
    this.current_contest_stage = this.stages.find((elem) => !!elem.is_current);
  }
}
