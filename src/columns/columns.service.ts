import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Column as BoardColumn } from './column.entity';
import { CreateColumnDto } from './create-column.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(BoardColumn)
    private columnsRepository: Repository<BoardColumn>,
  ) {}

  async createColumn(createColumnDto: CreateColumnDto): Promise<BoardColumn> {
    const column = this.columnsRepository.create({
      name: createColumnDto.name,
      user: { id: createColumnDto.userId } as User,
    });
    return this.columnsRepository.save(column);
  }

  async findColumnById(id: number): Promise<BoardColumn> {
    return this.columnsRepository.findOne({
      where: { id },
      relations: ['user', 'cards'],
    });
  }

  async findAllColumns(): Promise<BoardColumn[]> {
    return this.columnsRepository.find({ relations: ['user', 'cards'] });
  }

  async deleteColumn(id: number): Promise<void> {
    await this.columnsRepository.delete(id);
  }
}
