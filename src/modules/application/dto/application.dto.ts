import { ApplicationStage } from '../../application-stage/application-stage.entity';
import { File } from '../../file/file.entity';
import { ContestStage } from '../../contest-stage/contest-stage.entity';
import { ApplicationStatus } from '../../application-status/application-status.entity';
import { Vacancy } from '../../vacancy/vacancy.entity';
import { Applicant } from '../../applicant/applicant.entity';

export class ApplicationDto {
  application_stages: ApplicationStage[];
  files: File[];
  contest_stage: ContestStage;
  status: ApplicationStatus;
  vacancy: Vacancy;
  applicant: Applicant;

  constructor(props) {
    this.application_stages = props.application_stages;
    this.files = props.files;
    this.contest_stage = props.contest_stage;
    this.status = props.status;
    this.vacancy = props.vacancy;
    this.applicant = props.applicant;
  }
}
