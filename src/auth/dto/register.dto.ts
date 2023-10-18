import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'password must be 8 characters long' })
  password: string;

  @IsString()
  @MaxLength(20, { message: 'name is too long' })
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  imageURI?: string;
}
