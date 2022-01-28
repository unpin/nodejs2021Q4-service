import { CreateTaskDto } from './create-task.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @Optional()
  @IsString()
  readonly id: string;
}
