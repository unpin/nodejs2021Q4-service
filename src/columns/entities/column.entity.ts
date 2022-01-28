import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../../boards/entities/board.entity';

@Entity()
export class BoardColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, (board) => board.columns, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
    nullable: false,
  })
  @JoinColumn()
  board: Board;
}
