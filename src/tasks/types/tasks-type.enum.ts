import { registerEnumType } from '@nestjs/graphql';

export enum TaskTypeEnum {
  SOCIAL_MEDIA = 'Social media',
  FRIEND_INVITATION = 'Friend invitation',
}

registerEnumType(TaskTypeEnum, {
  name: 'TaskTypeEnum',
});
