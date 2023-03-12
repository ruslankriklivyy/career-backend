import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contest } from '../contest/contest.entity';

@Entity()
export class ContestStatus extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  name: string;

  @OneToMany(() => Contest, (contest) => contest.contest_status)
  contests: Contest[];
}
