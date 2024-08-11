import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/create-task.input';
import { TaskEntity } from './entities/task.entity';

@Resolver(() => TaskEntity)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => TaskEntity)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<TaskEntity> {
    return this.taskService.createTask(
      createTaskInput.title,
      createTaskInput.points,
      createTaskInput.type,
    );
  }

  @Mutation(() => Boolean)
  async deleteTask(@Args('taskId') taskId: string): Promise<boolean> {
    await this.taskService.deleteTask(taskId);
    return true;
  }

  @Query(() => [TaskEntity])
  async findAllTasks(): Promise<TaskEntity[]> {
    return this.taskService.findAllTasks();
  }
}
