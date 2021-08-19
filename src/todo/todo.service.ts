import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todo: Repository<Todo>,
  ) {}
  async getTodoById(id: number): Promise<Todo> {
    const found = await this.todo.findOne(id);
    if (!found) {
      throw new NotFoundException(`Didnot found any todo with that ${id}`);
    }
    return found;
  }
  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { name, description } = createTodoDto;
    const todo = this.todo.create({ name, description });

    return await this.todo.save(todo);
  }
  async deleteTodo(id: number): Promise<void> {
    const todos = await this.todo.findOne(id);
    if (!todos) {
      throw new NotFoundException(`Todo with ${id} doesnot exist`);
    }
    await this.todo.remove(todos);
  }
  async updateTodo(id: number, attr: Partial<Todo>): Promise<Todo> {
    const todos = await this.todo.findOne(id);
    if (!todos) {
      throw new NotFoundException(`Todo with that id ${id} doesnot found`);
    }
    Object.assign(todos, attr);
    return await this.todo.save(todos);
  }
  async getTodo(): Promise<Todo[]> {
    return await this.todo.find();
  }
}
