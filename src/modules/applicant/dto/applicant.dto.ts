import { User } from '../../user/user.entity';

export class ApplicantDto {
  autobiography: string;
  birthday: string;
  birthday_city: string;
  email: string;
  full_name: string;
  passport_number: number;
  passport_series: string;
  phones: string[];
  registration_address: string;
  residence_address: string;
  rnokpp: string;
  user: User;

  constructor(props) {
    this.autobiography = props.autobiography;
    this.birthday = props.birthday;
    this.birthday_city = props.birthday_city;
    this.email = props.email;
    this.full_name = props.full_name;
    this.passport_number = props.passport_number;
    this.passport_series = props.passport_series;
    this.phones = props.phones;
    this.residence_address = props.residence_address;
    this.rnokpp = props.rnokpp;
    this.user = props.user;
  }
}
