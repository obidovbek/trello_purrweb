import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './create-comment.dto';
import { CardsService } from '../cards/cards.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private cardsService: CardsService,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    userId: number,
  ): Promise<Comment> {
    const card = await this.cardsService.findCardById(createCommentDto.cardId);
    const comment = this.commentsRepository.create({
      text: createCommentDto.text,
      card,
      user: { id: userId } as any, // создание связи с пользователем
    });
    return this.commentsRepository.save(comment);
  }

  async findCommentById(id: number): Promise<Comment> {
    return this.commentsRepository.findOne({
      where: { id },
      relations: ['card', 'user'],
    });
  }

  async findAllComments(): Promise<Comment[]> {
    return this.commentsRepository.find({ relations: ['card', 'user'] });
  }

  async deleteComment(id: number): Promise<void> {
    await this.commentsRepository.delete(id);
  }
}
