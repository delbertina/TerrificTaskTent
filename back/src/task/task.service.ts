import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.softDelete(id);
  }

  create(Task: Partial<Task>): Promise<Task> {
    const newTask = this.tasksRepository.create(Task);
    return this.tasksRepository.save(newTask);
  }

  update(id: number, task: Partial<Task>): Promise<Task> {
    return this.tasksRepository.findOneBy({ id }).then((existingTask) => {
      if (!existingTask) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      return this.tasksRepository.save({ ...existingTask, ...task });
    });
  }
}
