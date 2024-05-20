import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { CardsService } from './cards.service';

@Injectable()
export class CardOwnerGuard implements CanActivate {
  constructor(private readonly cardsService: CardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const cardId = request.params.id;

    const card = await this.cardsService.findCardById(cardId);
    if (!card || card.user.id !== user.userId) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
