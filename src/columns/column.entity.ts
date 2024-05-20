import {
  Entity,
  PrimaryGeneratedColumn,
  Column as ColumnT,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Card } from '../cards/card.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Column {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ColumnT()
  name: string;

  @ManyToOne(() => User, (user) => user.columns)
  user: User;

  @OneToMany(() => Card, (card) => card.column)
  cards: Card[];
}
