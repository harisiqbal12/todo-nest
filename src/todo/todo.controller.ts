import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards';
import { TodoService } from './todo.service';
import { GetUser } from '../auth/decorators/user.decorator';
import { JwtUser } from 'src/common';
import { CreateDTO, UpdateDTO } from './dto';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Get('')
  getAllTodo(@GetUser() user: JwtUser) {
    return this.todoService.getAllTodo(user.id);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  @Post('')
  createTodo(@GetUser() user: JwtUser, @Body() dto: CreateDTO) {
    return this.todoService.createTodo(user.id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Patch('')
  updateTodo(@GetUser() user: JwtUser, @Body() dto: UpdateDTO) {
    return this.todoService.updateTodo(user.id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Delete('/:id')
  deleteTodo(@GetUser() user: JwtUser, @Param('id') id: string) {
    return this.todoService.deleteTodo(user.id, id);
  }

  @HttpCode(HttpStatus.FOUND)
  @UseGuards(JwtGuard)
  @Get('/:id')
  getTodo(@GetUser() user: JwtUser, @Param('id') id: string) {
    return this.todoService.getTodo(user.id, id);
  }
}
