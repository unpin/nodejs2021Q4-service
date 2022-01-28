import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly order: number;

  @IsString()
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly userId: string;

  @IsString()
  @IsOptional()
  readonly boardId: string;

  @IsString()
  @IsOptional()
  readonly columnId: string;
}
