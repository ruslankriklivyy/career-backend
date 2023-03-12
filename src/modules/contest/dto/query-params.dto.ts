import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class FilterParamsDto {
  @IsString()
  name: string;

  @IsString()
  value: string;
}

class SortParamsDto {
  @IsString()
  name: string;

  @IsString()
  order: string;
}

export class QueryParamsDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => SortParamsDto)
  sort: SortParamsDto;

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => FilterParamsDto)
  // filter: FilterParamsDto;
}
