import { registerEnumType } from '@nestjs/graphql';

export enum TaskStatusEnum {
  INCOMPLETE = 'INCOMPLETE',
  COMPLETE = 'COMPLETE',
}

registerEnumType(TaskStatusEnum, {
  name: 'TaskStatusEnum',
});
