import { Commission } from '../../commission/commission.entity';
import { Applicant } from '../../applicant/applicant.entity';

export class UserDto {
  email: string;
  password: string;
  full_name: string;
  rnokpp: string;
  registration_address: string;
  avatar_url: string;
  phones: string[];
  commissions: Commission[];
  applicant: Applicant;

  constructor(props) {
    this.email = props.email;
    this.password = props.password;
    this.full_name = props.full_name;
    this.password = props.password;
    this.rnokpp = props.rnokpp;
    this.registration_address = props.registration_address;
    this.avatar_url = props.avatar_url;
    this.phones = props.phones;
    this.commissions = props.commissions;
    this.applicant = props.applicant;
  }
}
