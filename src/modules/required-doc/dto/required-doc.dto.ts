import { Contest } from '../../contest/contest.entity';

export class RequiredDocDto {
  name: string;
  contest: Contest;

  constructor(props) {
    this.name = props.name;
    this.contest = props.contest;
  }
}
