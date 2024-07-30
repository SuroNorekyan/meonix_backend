import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
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
