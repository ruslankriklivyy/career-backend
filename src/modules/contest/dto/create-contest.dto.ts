import { IsArray, IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateContestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  address: string;

  @IsString()
  name: string;

  @IsString()
  start_date: string;

  @IsString()
  end_date: string;

  @IsString()
  terms: string;

  @IsString()
  description: string;

  @IsString()
  conditions: string;

  @IsInt()
  commission_id: number;

  @IsInt()
  contest_status_id: number;

  @IsArray()
  stages: any[];

  @IsArray()
  vacancies: any[];

  @IsArray()
  required_docs: number[];
}
