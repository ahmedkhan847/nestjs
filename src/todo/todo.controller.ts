import * as Joi from '@hapi/joi';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JoiValidationPipe } from 'src/pipes/joi_validation_pipe';
import { CreateTodoDto } from './create-todo.dto';
import { Todo } from './todo.entity';
import { TodoParams, TodoService } from './todo.service';

const createTodoSchema = Joi.object().keys({
  title: Joi.string().required(),
  task: Joi.string().required(),
});

@ApiBearerAuth()
@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @ApiBody({
    description: 'Create Todo',
    type: CreateTodoDto,
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: true,
        data: {
          id: 1,
          todo: 'Todo',
          task: 'Task',
        },
        errors: [],
        message: 'Todo Created Successfully',
      },
    },
  })
  @UsePipes(new JoiValidationPipe(createTodoSchema))
  @ApiResponse({
    status: 401,
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: {
        status: false,
        message: 'Unable to create todo',
        errors: [
          {
            message: '"title" is required',
            path: ['title'],
            type: 'any.required',
            context: {
              label: 'title',
              key: 'title',
            },
          },
          {
            message: '"task" is required',
            path: ['task'],
            type: 'any.required',
            context: {
              label: 'task',
              key: 'task',
            },
          },
        ],
        data: [],
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateTodoDto) {
    try {
      const todo: Todo = await this.todoService.create(body);
      return {
        status: true,
        message: 'Todo Created Successfully',
        data: todo,
        errors: [],
      };
    } catch (error) {
      return {
        status: false,
        message: 'Unable to create todo',
        data: [],
        errors: error,
      };
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 401,
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: true,
        data: [
          {
            id: 1,
            todo: 'Todo',
            task: 'Task',
          },
        ],
        errors: [],
        message: 'Todo found',
      },
    },
  })
  @ApiQuery({ name: 'title', type: 'string', required: false })
  @ApiQuery({ name: 'task', type: 'string', required: false })
  async index(@Query() { title, task }: { title: string; task: string }) {
    try {
      const todos: Todo[] = await this.todoService.findAll({ title, task });
      return { status: true, message: 'Todos Found', data: todos, errors: [] };
    } catch (error) {
      return {
        status: false,
        message: 'Unable to find todos',
        data: [],
        errors: error,
      };
    }
  }

  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: true,
        data: {
          id: 1,
          todo: 'Todo',
          task: 'Task',
        },
        errors: [],
        message: 'Todo found',
      },
    },
  })
  @ApiResponse({
    status: 401,
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async find(@Param('id') id: number) {
    try {
      const todo: Todo = await this.todoService.findOne(id);
      return { status: true, message: 'Todo found', data: todo, errors: [] };
    } catch (error) {
      return {
        status: false,
        message: 'Unable to find todo',
        data: [],
        errors: error,
      };
    }
  }

  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: true,
        data: [],
        errors: [],
        message: 'Todo has been removed',
      },
    },
  })
  @ApiResponse({
    status: 401,
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      await this.todoService.remove(id);
      return {
        status: true,
        message: 'Todo has been removed',
        data: [],
        errors: [],
      };
    } catch (error) {
      return {
        status: false,
        message: 'Unable to remove todo',
        data: [],
        errors: error,
      };
    }
  }
}
