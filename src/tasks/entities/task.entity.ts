import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../../boards/entities/board.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Task {
  @Index()
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
  userId: string;

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
