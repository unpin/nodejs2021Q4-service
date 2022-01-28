import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Optional()
  @IsString()
  readonly id: string;
}
