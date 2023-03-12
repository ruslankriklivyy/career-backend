import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Application } from '../application/application.entity';

@Entity()
export class ApplicationStatus extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name: string;

  @OneToMany(() => Application, (application) => application.status)
  public applications: Application[];
}
