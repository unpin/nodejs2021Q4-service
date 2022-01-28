import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardColumn } from '../columns/entities/column.entity';
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

  findAll() {
    return this.boardRepository.find({
      relations: ['columns'],
    });
  }

  async findOne(id: string) {
    const board = await this.boardRepository.findOne(id, {
      relations: ['columns'],
    });
    if (!board) {
      throw new NotFoundException(`Board with id ${id} not found`);
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
      throw new NotFoundException(`Board with id ${id} not found`);
    }
    return this.boardRepository.save(board);
  }

  async remove(id: string) {
    const board = await this.findOne(id);
    return this.boardRepository.remove(board);
  }
}
