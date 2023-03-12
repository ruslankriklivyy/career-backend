import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateDecisionDataDto {
  @IsString()
  decision_date: string;

  @IsInt()
  decision_number: number;

  @IsString()
  text: string;

  @IsInt()
  decision_type_id: number;

  @IsInt()
  commission_id: number;

  @IsInt()
  contest_id: number;

  @IsInt()
  vacancy_id: number;
}

export class CreateDecisionDto {
  @ValidateNested()
  @Type(() => CreateDecisionDataDto)
  data: CreateDecisionDataDto;

  @IsOptional()
  @IsArray()
  files: Express.Multer.File[];
}
