import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../user/user.entity';
import { Application } from '../application/application.entity';
import { Decision } from '../decision/decision.entity';

@Entity()
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name: string;

  @Column()
  public file_url: string;

  @Column()
  public file_name: string;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @ManyToOne(() => Application, (application) => application.files, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'application_id' })
  public application: Application;

  @ManyToOne(() => Decision, (decision) => decision.files, { nullable: true })
  @JoinColumn({ name: 'decision_id' })
  public decision: Decision;

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
