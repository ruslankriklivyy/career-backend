import { IsNumber, IsOptional } from 'class-validator';

export class CreateApplicationDto {
  @IsNumber()
  applicant_id: number;

  @IsNumber()
  vacancy_id: number;

  @IsNumber()
  status_id: number;

  applicant: any;

  @IsOptional()
  files?: any[];
}
