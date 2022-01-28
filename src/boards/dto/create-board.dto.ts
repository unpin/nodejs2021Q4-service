import { IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateColumnDto } from '../../columns/dto/create-column.dto';

export class CreateBoardDto {
  @IsOptional()
  @IsString()
  readonly id: string;

  @IsString()
  readonly title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateColumnDto)
  readonly columns: CreateColumnDto[];
}
