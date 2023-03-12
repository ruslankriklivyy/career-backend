import { State } from '../../state/state.entity';
import { City } from '../../city/city.entity';
import { File } from '../../file/file.entity';

export class SaveVacancyDto {
  name: string;
  count: number;
  file?: File | null;
  state: State;
  city: City;

  constructor(payload) {
    this.name = payload.name;
    this.count = payload.count;
    this.file = payload.file;
    this.state = payload.state;
    this.city = payload.city;
  }
}
