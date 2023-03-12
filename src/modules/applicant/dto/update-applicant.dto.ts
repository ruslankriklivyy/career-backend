import { ApplicantDto } from './applicant.dto';

export class UpdateApplicantDto extends ApplicantDto {
  constructor(props) {
    super(props);

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
  }
}
