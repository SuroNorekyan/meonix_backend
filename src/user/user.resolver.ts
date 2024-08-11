import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UserType } from './types/user.type';
import { UpdateEnergyInput } from './dto/update-energy.input';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserType)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserType> {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => UserType)
  async assignTaskToUser(
    @Args('userId') userId: number,
    @Args('taskId') taskId: number,
  ): Promise<UserType> {
    return this.userService.assignTaskToUser(userId, taskId);
  }

  @Mutation(() => UserType)
  async unassignTaskFromUser(
    @Args('userId') userId: number,
    @Args('taskId') taskId: number,
  ): Promise<UserType> {
    return this.userService.unassignTaskFromUser(userId, taskId);
  }

  @Query(() => UserType)
  async findUserTasks(@Args('userId') telegramId: string): Promise<UserType> {
    return this.userService.findUserTasks(telegramId);
  }

  @Query(() => UserType, { name: 'user' })
  async getUser(@Args('telegramId') telegramId: string): Promise<UserType> {
    return this.userService.findOne(telegramId);
  }

  @Mutation(() => UserType)
  async addEnergy(
    @Args('telegramId') telegramId: string,
    @Args('updateEnergyInput') updateEnergyInput: UpdateEnergyInput,
  ): Promise<UserType> {
    return this.userService.addEnergy(telegramId, updateEnergyInput);
  }

  @Mutation(() => UserType)
  async subtractEnergy(
    @Args('telegramId') telegramId: string,
    @Args('updateEnergyInput') updateEnergyInput: UpdateEnergyInput,
  ): Promise<UserType> {
    return this.userService.subtractEnergy(telegramId, updateEnergyInput);
  }
}
