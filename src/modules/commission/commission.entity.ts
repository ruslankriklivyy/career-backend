import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../user/user.entity';
import { Contest } from '../contest/contest.entity';
import { Decision } from '../decision/decision.entity';

@Entity()
export class Commission extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.commissions)
  @JoinTable({
    name: 'commission_user',
    joinColumn: {
      name: 'commission_id',
    },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];

  @OneToMany(() => Contest, (contest) => contest.id)
  @JoinColumn()
  contests: Contest[];

  @OneToMany(() => Decision, (decision) => decision.commission)
  @JoinColumn()
  decisions: Decision[];

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
