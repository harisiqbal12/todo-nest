import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteTodo {
  @IsString()
  @IsNotEmpty()
  todoId: string;
}
