import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TaskTypeEnum } from '../types/tasks-type.enum';
import { TaskStatusEnum } from '../types/task-status.enum';

@ObjectType()
@Entity()
export class TaskEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field(() => Int)
  @Column()
  points: number;

  @Field(() => TaskTypeEnum)
  @Column()
  type: TaskTypeEnum;

  @Field(() => TaskStatusEnum)
  @Column({ default: TaskStatusEnum.INCOMPLETE })
  status: TaskStatusEnum;
}
