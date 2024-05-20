import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Card } from '../cards/card.entity';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Comment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  text: string;

  @ManyToOne(() => Card, (card) => card.comments)
  card: Card;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
