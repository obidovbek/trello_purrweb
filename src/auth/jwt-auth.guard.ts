import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Добавьте любую пользовательскую логику активации здесь
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // Вы можете выбросить ошибку или вернуть пользователя для привязки к request
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
