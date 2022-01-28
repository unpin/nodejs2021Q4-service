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
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() paginationQuery: { limit: number; offset: number }) {
    const { limit, offset } = paginationQuery;
    return this.boardService.findAll();
  }

  @Get(':boardId')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('boardId') boardId: string) {
    return this.boardService.findOne(boardId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Put(':boardId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('boardId') boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardService.update(boardId, updateBoardDto);
  }

  @Delete(':boardId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('boardId') boardId: string) {
    return this.boardService.remove(boardId);
  }
}
