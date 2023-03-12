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

import { File } from '../file/file.entity';
import { Contest } from '../contest/contest.entity';
import { State } from '../state/state.entity';
import { City } from '../city/city.entity';
import { Application } from '../application/application.entity';
import { Decision } from '../decision/decision.entity';

@Entity()
export class Vacancy extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name: string;

  @Column({ type: 'int', nullable: true })
  public count: number;

  @OneToMany(() => Application, (application) => application.vacancy, {
    onUpdate: 'CASCADE',
  })
  public applications: Application[];

  @OneToOne(() => File, { nullable: true, eager: true })
  @JoinColumn({ name: 'file_id' })
  public file?: File;

  @OneToOne(() => Decision)
  @JoinColumn({ name: 'decision_id' })
  public decision: Decision;

  @ManyToOne(() => Contest, (contest) => contest.vacancies, {
    cascade: true,
  })
  @JoinColumn({ name: 'contest_id' })
  public contest: Contest;

  @ManyToOne(() => State, (state) => state.vacancies, { eager: true })
  @JoinColumn({ name: 'state_id' })
  public state: State;

  @ManyToOne(() => City, (city) => city.vacancies, { eager: true })
  @JoinColumn({ name: 'city_id' })
  public city: City;

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
