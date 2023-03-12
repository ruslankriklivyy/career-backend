import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicationStage } from '../application-stage/application-stage.entity';

@Entity()
export class ApplicationStageStatus extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name: string;

  @OneToMany(
    () => ApplicationStage,
    (applicationStage) => applicationStage.status,
  )
  public applicationStages: ApplicationStage[];
}
