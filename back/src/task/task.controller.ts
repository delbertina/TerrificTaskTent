import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Post()
  create(@Body() task: Partial<Task>): Promise<Task> {
    return this.taskService.create(task);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() Task: Partial<Task>): Promise<Task> {
    return this.taskService.update(id, Task);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.taskService.remove(id);
  }
}
