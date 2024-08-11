import { Injectable, OnModuleInit } from '@nestjs/common';
import { TaskService } from '../task.service';
import { TaskTypeEnum } from '../types/tasks-type.enum';

@Injectable()
export class TaskSeedService implements OnModuleInit {
  constructor(private readonly taskService: TaskService) {}

  async onModuleInit() {
    await this.taskService.createTask(
      'Follow our Instagram',
      400,
      TaskTypeEnum.SOCIAL_MEDIA,
    );
    await this.taskService.createTask(
      'Invite a Friend',
      500,
      TaskTypeEnum.FRIEND_INVITATION,
    );
    await this.taskService.createTask(
      'Join our Telegram',
      300,
      TaskTypeEnum.SOCIAL_MEDIA,
    );
    await this.taskService.createTask(
      'Share our Post',
      200,
      TaskTypeEnum.SOCIAL_MEDIA,
    );
  }
}
