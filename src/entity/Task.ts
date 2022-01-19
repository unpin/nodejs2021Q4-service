import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Board } from './Board';
import { User } from './User';

@Entity('task')
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  @Column({ type: 'uuid', nullable: true, name: 'userId' })
  userId: string | null | undefined;

  @ManyToOne(() => Board, (board) => board.id, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'boardId' })
  @Column({ type: 'uuid', nullable: true, name: 'boardId' })
  boardId: string;

  @Column({ type: 'uuid', nullable: true, name: 'columnId' })
  columnId: string;
}
