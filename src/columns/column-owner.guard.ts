import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';

@Injectable()
export class ColumnOwnerGuard implements CanActivate {
  constructor(private readonly columnsService: ColumnsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const columnId = request.params.id;

    const column = await this.columnsService.findColumnById(columnId);
    if (!column || column.user.id !== user.userId) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
