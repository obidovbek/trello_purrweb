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
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './create-column.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ColumnOwnerGuard } from './column-owner.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('columns')
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @ApiOperation({ summary: 'Создать новый столбец' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createColumn(
    @Body() createColumnDto: CreateColumnDto,
    @Request() req,
  ): Promise<any> {
    const userId = req.user.userId;
    return this.columnsService.createColumn({
      ...createColumnDto,
      userId,
    });
  }

  @ApiOperation({ summary: 'Получить столбец по идентификатору' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getColumnById(@Param('id') id: number): Promise<any> {
    return this.columnsService.findColumnById(id);
  }

  @ApiOperation({ summary: 'Получить все столбцы' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllColumns(): Promise<any> {
    return this.columnsService.findAllColumns();
  }

  @ApiOperation({ summary: 'Удалить столбец' })
  @UseGuards(JwtAuthGuard, ColumnOwnerGuard)
  @Delete(':id')
  async deleteColumn(@Param('id') id: number): Promise<void> {
    return this.columnsService.deleteColumn(id);
  }
}
