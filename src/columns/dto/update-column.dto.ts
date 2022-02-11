import { CreateColumnDto } from './create-column.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateColumnDto extends PartialType(CreateColumnDto) {}
