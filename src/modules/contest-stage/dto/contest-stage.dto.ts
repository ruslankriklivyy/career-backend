import { Stage } from '../../stage/stage.entity';

export class ContestStageDto {
  id: number;
  start_date: string | null;
  end_date: string | null;
  order: number;
  is_current: boolean | null;
  stage: Stage;

  constructor(props) {
    this.id = props.id;
    this.start_date = props.start_date;
    this.end_date = props.end_date;
    this.order = props.order;
    this.is_current = props.is_current;
    this.stage = props.stage;
  }
}
