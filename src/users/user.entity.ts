import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Column as BoardColumn } from '../columns/column.entity';
import { Card } from '../cards/card.entity';
import { Comment } from '../comments/comment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @OneToMany(() => BoardColumn, (column) => column.user)
  columns: BoardColumn[];

  @OneToMany(() => Card, (card) => card.user)
  cards: Card[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
