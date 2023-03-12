import { DecisionType } from '../../decision-type/decision-type.entity';
import { Commission } from '../../commission/commission.entity';
import { Contest } from '../../contest/contest.entity';
import { Vacancy } from '../../vacancy/vacancy.entity';
import { File } from '../../file/file.entity';

export class DecisionDto {
  decision_date: string;
  decision_number: number;
  text: string;
  decision_type: DecisionType;
  commission: Commission;
  contest: Contest;
  vacancy: Vacancy;
  files: File[] | null;

  constructor(props) {
    this.decision_date = props.decision_date;
    this.decision_number = props.decision_number;
    this.text = props.text;
    this.decision_type = props.decision_type;
    this.commission = props.commission;
    this.contest = props.contest;
    this.vacancy = props.vacancy;
    this.files = props.files;
  }
}
