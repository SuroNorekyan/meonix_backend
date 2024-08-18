import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateCoinsInput {
  @Field(() => Int)
  coins: number;
}
