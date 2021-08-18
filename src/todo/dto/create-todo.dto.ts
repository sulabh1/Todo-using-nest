import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
