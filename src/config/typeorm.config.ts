import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Todo } from 'src/todo/todo.entity';
import { User } from 'src/user/user.entity';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'todo',
  entities: [Todo, User],
  synchronize: true,
};
