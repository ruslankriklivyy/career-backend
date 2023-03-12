import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contest } from '../contest/contest.entity';

@Entity()
export class RequiredDoc extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name: string;

  @ManyToMany(() => Contest, (contest) => contest.id)
  @JoinTable({
    name: 'required_doc_contest',
    joinColumn: { name: 'required_doc_id' },
    inverseJoinColumn: {
      name: 'contest_id',
    },
  })
  public contests: Contest[];
}
