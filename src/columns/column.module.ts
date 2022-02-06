import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from '../boards/board.module';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';
import { BoardColumn } from './entities/column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardColumn]), BoardModule],
  controllers: [ColumnController],
  providers: [ColumnService],
})
export class ColumnModule {}
