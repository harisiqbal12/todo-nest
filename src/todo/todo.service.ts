import { Injectable } from '@nestjs/common';
import catchError from 'src/errors/catchError';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoRes } from 'src/common';
import { CreateDTO, UpdateDTO } from './dto';
import AppError from 'src/errors/AppErrors';
import { StatusCodes } from 'src/errors/knownErrors';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  getAllTodo(id: string): Promise<TodoRes[]> {
    return catchError<TodoRes[]>(async () => {
      return await this.prisma.todo.findMany({
        where: {
          user_id: id,
        },

        select: {
          title: true,
          description: true,
          createdAt: true,
          id: true,
        },
      });
    });
  }

  createTodo(id: string, dto: CreateDTO): Promise<TodoRes> {
    return catchError<TodoRes>(async () => {
      return await this.prisma.todo.create({
        data: {
          ...dto,
          user_id: id,
        },

        select: {
          title: true,
          description: true,
          createdAt: true,
          id: true,
        },
      });
    });
  }

  updateTodo(id: string, dto: UpdateDTO): Promise<TodoRes> {
    return catchError<TodoRes>(async () => {
      await this.validateTodo(id, dto.todoId);

      return await this.prisma.todo.update({
        where: {
          id: dto.todoId,
        },

        data: {
          title: dto.title,
          description: dto.description,
        },

        select: {
          title: true,
          description: true,
          createdAt: true,
          id: true,
        },
      });
    });
  }

  deleteTodo(id: string, todoId: string): Promise<TodoRes> {
    return catchError<TodoRes>(async () => {
      await this.validateTodo(id, todoId);
      return await this.prisma.todo.delete({
        where: {
          id: todoId,
        },

        select: {
          title: true,
          description: true,
          createdAt: true,
          id: true,
        },
      });
    });
  }

  getTodo(id: string, todoId: string): Promise<TodoRes> {
    return catchError<TodoRes>(async () => {
      await this.validateTodo(id, todoId);

      const res = await this.prisma.todo.findUnique({
        where: {
          id: todoId,
        },

        select: {
          title: true,
          description: true,
          createdAt: true,
          id: true,
        },
      });

      return res;
    });
  }

  private async validateTodo(userId: string, todoId: string): Promise<void> {
    const isExisted = await this.prisma.todo.findUnique({
      where: {
        id: todoId,
      },

      select: {
        user_id: true,
      },
    });

    if (!isExisted) {
      throw new AppError('Todo does not exists', StatusCodes.NOTFOUND);
    }

    if (isExisted.user_id !== userId) {
      throw new AppError('Todo does not belongs to you', StatusCodes.FORBIDDEN);
    }
  }
}
