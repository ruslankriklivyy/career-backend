import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Role } from 'src/modules/auth/role.enum';
import { Commission } from '../commission/commission.entity';
import { Applicant } from '../applicant/applicant.entity';
import { File } from '../file/file.entity';
import { Token } from '../token/token.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public full_name: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({ unique: true })
  public rnokpp: string;

  @Column()
  public registration_address: string;

  @Column({ nullable: true })
  public avatar_url: string;

  @Column('varchar', { array: true })
  public phones: string[];

  @Column({ type: 'enum', enum: Role, default: Role.User })
  public user_role: Role;

  @ManyToMany(() => Commission, (commission) => commission.users)
  @JoinTable({
    name: 'commission_user',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: {
      name: 'commission_id',
    },
  })
  public commissions: Commission[];

  @OneToOne(() => Applicant, (applicant) => applicant.user, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'applicant_id' })
  public applicant: Applicant;

  @OneToOne(() => Token, (token) => token.user, { cascade: true })
  @JoinColumn({ name: 'token_id' })
  public token: Token;

  @OneToMany(() => File, (file) => file.user)
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
