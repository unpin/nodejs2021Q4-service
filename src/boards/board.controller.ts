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
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@UseGuards(AuthGuard)
@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  // @HttpCode(HttpStatus.OK)
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.boardService.findAll(paginationQueryDto);
  }

  @Get(':boardId')
  // @HttpCode(HttpStatus.OK)
  findOne(@Param('boardId') boardId: string) {
    return this.boardService.findOne(boardId);
  }

  @Post()
  // @HttpCode(HttpStatus.CREATED)
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Put(':boardId')
  // @HttpCode(HttpStatus.OK)
  update(
    @Param('boardId') boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardService.update(boardId, updateBoardDto);
  }

  @Delete(':boardId')
  // @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('boardId') boardId: string) {
    return this.boardService.remove(boardId);
  }
}
