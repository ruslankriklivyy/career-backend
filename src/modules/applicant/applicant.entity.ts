import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/user.entity';
import { Application } from '../application/application.entity';

@Entity()
export class Applicant extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ nullable: true })
  public autobiography: string | null;

  @Column({ nullable: true })
  public birthday: string | null;

  @Column({ nullable: true })
  public birthday_city: string | null;

  @Column({ unique: true })
  public email: string;

  @Column()
  public full_name: string;

  @Column({ type: 'integer', nullable: true })
  public passport_number: number | null;

  @Column({ nullable: true })
  public passport_series: string | null;

  @Column({ type: 'varchar', array: true })
  public phones: string[];

  @Column({ nullable: true })
  public registration_address: string | null;

  @Column({ nullable: true })
  public residence_address: string | null;

  @Column({ unique: true })
  public rnokpp: string;

  @OneToOne(() => User, (user) => user.applicant)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @OneToMany(() => Application, (application) => application.applicant)
  public applications: Application[];
}
