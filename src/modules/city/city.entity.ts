import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { State } from '../state/state.entity';
import { Vacancy } from '../vacancy/vacancy.entity';

@Entity()
export class City extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  name: string;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'state_id' })
  state: State;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.city)
  vacancies: Vacancy[];
}
