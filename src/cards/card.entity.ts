import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Column as BoardColumn } from '../columns/column.entity';
import { Comment } from '../comments/comment.entity';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Card {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ManyToOne(() => BoardColumn, (column) => column.cards)
  column: BoardColumn;

  @OneToMany(() => Comment, (comment) => comment.card)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.cards)
  user: User;
}
