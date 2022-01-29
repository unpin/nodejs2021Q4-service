import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardColumn } from '../../columns/entities/column.entity';

@Entity()
export class Board {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => BoardColumn, (column) => column.board, {
    cascade: true,
  })
  columns: BoardColumn[];
}
