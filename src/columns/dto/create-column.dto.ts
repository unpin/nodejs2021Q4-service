import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  title: string;

  @IsNumber()
  order: number;
}
