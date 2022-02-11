import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit = 50, offset = 0 } = paginationQueryDto;
    return this.taskRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      const message = `Task with id ${id} not found`;
      Logger.debug(message);
      throw new NotFoundException(message);
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create(createTaskDto);
    const saved = await this.taskRepository.save(task);
    return saved;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.preload({ id, ...updateTaskDto });
    if (!task) {
      const message = `Task with id ${id} not found`;
      Logger.debug(message);
      throw new NotFoundException(message);
    }
    return this.taskRepository.save(task);
  }

  async remove(id: string) {
    const task = await this.findOne(id);
    return this.taskRepository.remove(task);
  }
}
