import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';

@UseGuards(AuthGuard)
@Controller('boards')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':boardId/tasks')
  @HttpCode(HttpStatus.OK)
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.taskService.findAll(paginationQueryDto);
  }

  @Get(':boardId/tasks/:taskId')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('taskId') taskId: string) {
    return this.taskService.findOne(taskId);
  }

  @Post(':boardId/tasks')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const task = createTaskDto as Task;
    task.boardId = boardId;
    return this.taskService.create(task);
  }

  @Put(':boardId/tasks/:taskId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(taskId, updateTaskDto);
  }

  @Delete(':boardId/tasks/:taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('taskId') taskId: string) {
    return this.taskService.remove(taskId);
  }
}
