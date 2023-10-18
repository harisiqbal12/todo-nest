import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  MinLength,
} from 'class-validator';

export class UserDTO {
  @IsString()
  @MaxLength(20, { message: 'name is too long' })
  @MinLength(5, { message: 'name is too short' })
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  imageURI?: string;
}
