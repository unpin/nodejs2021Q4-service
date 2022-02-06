import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardService } from '../boards/board.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { BoardColumn } from './entities/column.entity';

@Injectable()
export class ColumnService {
  constructor(
    @Inject(BoardService)
    private readonly boardService: BoardService,
    @InjectRepository(BoardColumn)
    private readonly columnRepository: Repository<BoardColumn>,
  ) {}

  findAll() {
    return this.columnRepository.find();
  }

  async findOne(id: string) {
    const column = await this.columnRepository.findOne(id);
    if (!column) {
      throw new NotFoundException('Column with the columnId does not exist');
    }
    return column;
  }

  async create(boardId: string, createColumnDto: CreateColumnDto) {
    const board = await this.boardService.findOne(boardId);
    const column = this.columnRepository.create(createColumnDto);
    column.board = board;
    return this.columnRepository.save(column);
  }

  async update(id: string, updateColumnDto: UpdateColumnDto) {
    const column = await this.columnRepository.preload({
      id,
      ...updateColumnDto,
    });
    if (!column) {
      throw new NotFoundException(
        'Column with the given columnId does not exist',
      );
    }
    return await this.columnRepository.save(column);
  }

  async remove(id: string) {
    const column = await this.findOne(id);
    return this.columnRepository.remove(column);
  }
}
