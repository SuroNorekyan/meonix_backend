import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TaskEntity } from '../../tasks/entities/task.entity';

@ObjectType()
export class UserType {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  telegramId: string;

  @Field()
  energy: number;

  @Field(() => [TaskEntity])
  tasks: TaskEntity[];
}
