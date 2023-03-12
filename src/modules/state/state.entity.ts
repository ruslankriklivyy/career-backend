import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vacancy } from '../vacancy/vacancy.entity';

@Entity()
export class State extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name: string;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.state)
  vacancies: Vacancy[];
}
