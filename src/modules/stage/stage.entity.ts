import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContestStage } from '../contest-stage/contest-stage.entity';

@Entity()
export class Stage extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  name: string;

  @OneToMany(() => ContestStage, (contestStage) => contestStage.stage)
  contest_stages: ContestStage[];
}
