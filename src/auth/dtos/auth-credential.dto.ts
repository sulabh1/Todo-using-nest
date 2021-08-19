import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
//import { AllowedRole } from '../auth.entity';

export class AuthCredentialDto {
  @IsString()
  @IsNotEmpty({ message: 'The name is required' })
  readonly name: string;
  @IsEmail()
  @IsNotEmpty({ message: 'The email is required' })
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  @Length(6, 30, {
    message: 'The password must be atleast 6 but not longer than 30 character',
  })
  //to validate any other thing should pass regex in @match()
  readonly password: string;
  @IsArray()
  @IsOptional()
  readonly role: ['user', 'admin'];
}
