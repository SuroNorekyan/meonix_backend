import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { TaskTypeEnum } from './types/tasks-type.enum';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async createTask(
    title: string,
    points: number,
    type: TaskTypeEnum,
  ): Promise<TaskEntity> {
    const task = this.taskRepository.create({ title, points, type });
    return this.taskRepository.save(task);
  }

  async findAllTasks(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
