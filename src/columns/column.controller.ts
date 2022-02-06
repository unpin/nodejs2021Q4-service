import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { LoggingInterceptor } from '../common/interceptors/logging-interceptor';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
@Controller('/boards/:boardId/columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Get()
  // @HttpCode(HttpStatus.OK)
  findAll() {
    return this.columnService.findAll();
  }

  @Get(':columnId')
  // @HttpCode(HttpStatus.OK)
  findOne(@Param('columnId', ParseUUIDPipe) columnId: string) {
    return this.columnService.findOne(columnId);
  }

  @Post()
  // @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body() createColumnDto: CreateColumnDto,
  ) {
    return await this.columnService.create(boardId, createColumnDto);
  }

  @Put(':columnId')
  // @HttpCode(HttpStatus.OK)
  update(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.columnService.update(columnId, updateColumnDto);
  }

  @Delete(':columnId')
  // @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('columnId') columnId: string) {
    return this.columnService.remove(columnId);
  }
}
