import { InputType, Field } from '@nestjs/graphql';
import { TaskTypeEnum } from '../types/tasks-type.enum';

@InputType()
export class CreateTaskInput {
  @Field()
  title: string;

  @Field()
  telegramId: string;

  @Field()
  points: number;

  @Field(() => TaskTypeEnum)
  type: TaskTypeEnum;
}
