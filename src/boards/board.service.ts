import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardColumn } from '../columns/entities/column.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(BoardColumn)
    private readonly columnRepository: Repository<BoardColumn>,
  ) {}

  findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit = 50, offset = 0 } = paginationQueryDto;
    return this.boardRepository.find({
      relations: ['columns'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const board = await this.boardRepository.findOne(id, {
      relations: ['columns'],
    });
    if (!board) {
      const message = `Board with the id ${id} is not found`;
      Logger.debug(message);
      throw new NotFoundException(message);
    }
    return board;
  }

  create(createBoardDto: CreateBoardDto) {
    const board = this.boardRepository.create(createBoardDto);
    const columns = board.columns;
    columns.map((column) => this.columnRepository.create(column));
    board.columns = [...columns];
    return this.boardRepository.save(board);
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const boardToUpdate = updateBoardDto as Board;
    delete boardToUpdate.id;
    const board = await this.boardRepository.preload({ id, ...updateBoardDto });
    if (!board) {
      const message = `Board with the id ${id} is not found`;
      Logger.debug(message);
      throw new NotFoundException(message);
    }
    return this.boardRepository.save(board);
  }

  async remove(id: string) {
    const board = await this.findOne(id);
    return this.boardRepository.remove(board);
  }
}
