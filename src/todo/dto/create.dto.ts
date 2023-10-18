import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'title must be grater than 10 characters' })
  @MaxLength(30, { message: 'title must be less than 30 characters' })
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
