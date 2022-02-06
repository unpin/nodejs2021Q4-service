import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardColumn } from '../columns/entities/column.entity';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    TypeOrmModule.forFeature([BoardColumn]),
  ],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService],
})
export class BoardModule {}
