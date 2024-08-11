import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TaskEntity } from '../../../tasks/entities/task.entity';

@ObjectType()
@Entity()
export class UserEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  telegramId: string;

  @Field(() => Int)
  @Column({ default: 0 })
  energy: number;

  @Field(() => [TaskEntity])
  @ManyToMany(() => TaskEntity)
  @JoinTable()
  tasks: TaskEntity[];
}
