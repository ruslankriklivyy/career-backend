import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Decision } from '../decision/decision.entity';

@Entity()
export class DecisionType extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name: string;

  @OneToMany(() => Decision, (decision) => decision.decision_type)
  @JoinColumn()
  public decisions: Decision[];
}
