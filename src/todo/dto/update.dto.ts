import { IsNotEmpty, IsString } from 'class-validator';
import { CreateDTO } from './create.dto';

export class UpdateDTO extends CreateDTO {
  @IsString()
  @IsNotEmpty()
  todoId: string;
}
