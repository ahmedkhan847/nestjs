import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Todo } from './todo.entity';

export interface TodoParams {
  title: string;
  task: string;
}

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async create({ title, task }: TodoParams): Promise<Todo> {
    const todo: Todo = new Todo();
    todo.title = title;
    todo.task = task;
    const createdTodo = await this.todoRepository.save(todo);
    console.log(createdTodo);
    return createdTodo;
  }
  findAll({ title, task }: { title?: string; task?: string }): Promise<Todo[]> {
    const where: any = {};
    if (title && task) {
      where['title'] = Like(`${title}%`);
      where['task'] = Like(`${task}%`);
    } else if (title) {
      where['title'] = Like(`${title}%`);
    } else if (task) {
      where['task'] = Like(`${task}%`);
    }
    return this.todoRepository.find({
      where,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
