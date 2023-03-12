import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  full_name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(9)
  rnokpp: string;

  @IsEmpty()
  registration_address: string;

  @IsEmpty()
  avatar: any;

  @IsString()
  password: string;
}
