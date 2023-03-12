import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Commission } from '../commission/commission.entity';
import { Contest } from '../contest/contest.entity';
import { Vacancy } from '../vacancy/vacancy.entity';
import { DecisionType } from '../decision-type/decision-type.entity';
import { File } from '../file/file.entity';

@Entity()
export class Decision extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public decision_date: string;

  @Column({ type: 'integer' })
  public decision_number: number;

  @Column()
  public text: string;

  @ManyToOne(() => DecisionType, (decisionType) => decisionType, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'decision_type_id' })
  public decision_type: DecisionType;

  @ManyToOne(() => Commission, (commission) => commission, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'commission_id' })
  public commission: Commission;

  @ManyToOne(() => Contest, (contest) => contest.decisions, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'contest_id' })
  public contest: Contest;

  @OneToOne(() => Vacancy, { cascade: true, eager: true })
  @JoinColumn({ name: 'vacancy_id' })
  public vacancy: Vacancy;

  @OneToMany(() => File, (file) => file.decision, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public files: File[];

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
