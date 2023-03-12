import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class UpdateDecisionData {
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

  @IsOptional()
  @IsArray()
  files: any[];
}

export class UpdateDecisionDto {
  @ValidateNested()
  @Type(() => UpdateDecisionData)
  data: UpdateDecisionData;

  @IsOptional()
  @IsArray()
  files: Express.Multer.File[];
}
