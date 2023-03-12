import { Application } from '../../application/application.entity';
import { ApplicationStageStatus } from '../../application-stage-status/application-stage-status.entity';
import { ContestStage } from '../../contest-stage/contest-stage.entity';
import { State } from '../../state/state.entity';
import { City } from '../../city/city.entity';

export class ApplicationStageDto {
  address: string;
  date: string;
  report: string;
  application: Application;
  status: ApplicationStageStatus;
  contest_stage: ContestStage;
  state: State;
  city: City;

  constructor(props) {
    this.address = props.address;
    this.date = props.date;
    this.report = props.report;
    this.application = props.application;
    this.status = props.status;
    this.contest_stage = props.contest_stage;
    this.state = props.state;
    this.city = props.city;
  }
}
