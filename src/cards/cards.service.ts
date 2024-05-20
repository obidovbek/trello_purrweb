import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { CreateCardDto } from './create-card.dto';
import { User } from '../users/user.entity';
import { Column as BoardColumn } from '../columns/column.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
  ) {}

  async createCard(createCardDto: CreateCardDto): Promise<Card> {
    const card = this.cardsRepository.create({
      title: createCardDto.title,
      description: createCardDto.description,
      column: { id: createCardDto.columnId } as BoardColumn,
      user: { id: createCardDto.userId } as User,
    });
    return this.cardsRepository.save(card);
  }

  async findCardById(id: number): Promise<Card> {
    return this.cardsRepository.findOne({
      where: { id },
      relations: ['column', 'comments'],
    });
  }

  async findAllCards(): Promise<Card[]> {
    return this.cardsRepository.find({ relations: ['column', 'comments'] });
  }

  async deleteCard(id: number): Promise<void> {
    await this.cardsRepository.delete(id);
  }
}
