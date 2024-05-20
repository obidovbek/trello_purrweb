import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './create-card.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CardOwnerGuard } from './card-owner.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiOperation({ summary: 'Создать новую карту' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createCard(
    @Body() createCardDto: CreateCardDto,
    @Request() req,
  ): Promise<any> {
    const userId = req.user.userId;
    return this.cardsService.createCard({
      ...createCardDto,
      userId,
    });
  }

  @ApiOperation({ summary: 'Получить карту по ID' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCardById(@Param('id') id: number): Promise<any> {
    return this.cardsService.findCardById(id);
  }

  @ApiOperation({ summary: 'Получить все карты' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCards(): Promise<any> {
    return this.cardsService.findAllCards();
  }

  @ApiOperation({ summary: 'Удалить карту' })
  @UseGuards(JwtAuthGuard, CardOwnerGuard)
  @Delete(':id')
  async deleteCard(@Param('id') id: number): Promise<void> {
    return this.cardsService.deleteCard(id);
  }
}
