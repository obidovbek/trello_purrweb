import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Получить пользователя по идентификатору' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<any> {
    return this.usersService.findUserById(id);
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(): Promise<any> {
    return this.usersService.findAllUsers();
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
