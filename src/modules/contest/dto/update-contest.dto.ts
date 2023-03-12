import { IsArray, IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateContestDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  start_date: string;

  @IsOptional()
  @IsString()
  end_date: string;

  @IsOptional()
  @IsString()
  terms: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  conditions: string;

  @IsOptional()
  @IsInt()
  commission_id: number;

  @IsOptional()
  @IsInt()
  contest_status_id: number;

  @IsOptional()
  @IsArray()
  stages: any[];

  @IsOptional()
  @IsArray()
  vacancies: any[];

  @IsOptional()
  @IsArray()
  required_docs: number[];
}
