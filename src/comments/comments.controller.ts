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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './create-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommentOwnerGuard } from './comment-owner.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Создать новый комментарий' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Request() req,
  ): Promise<any> {
    const userId = req.user.userId;
    return this.commentsService.createComment(createCommentDto, userId);
  }

  @ApiOperation({ summary: 'Получить комментарий по идентификатору' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCommentById(@Param('id') id: number): Promise<any> {
    return this.commentsService.findCommentById(id);
  }

  @ApiOperation({ summary: 'Получить все комментарии' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllComments(): Promise<any> {
    return this.commentsService.findAllComments();
  }

  @ApiOperation({ summary: 'Удалить комментарий' })
  @UseGuards(JwtAuthGuard, CommentOwnerGuard)
  @Delete(':id')
  async deleteComment(@Param('id') id: number): Promise<void> {
    return this.commentsService.deleteComment(id);
  }
}
