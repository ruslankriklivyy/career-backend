import { File } from '../../file/file.entity';
import { Contest } from '../../contest/contest.entity';
import { State } from '../../state/state.entity';
import { City } from '../../city/city.entity';

export class VacancyDto {
  id: number;
  name: string;
  count: number;
  file: File | null;
  contest: Contest;
  state: State;
  city: City;

  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.count = props.count;
    this.file = props.file;
    this.contest = props.contest;
    this.state = props.state;
    this.city = props.city;
  }
}
