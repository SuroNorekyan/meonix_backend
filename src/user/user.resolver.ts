import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UserType } from './types/user.type';

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
}
