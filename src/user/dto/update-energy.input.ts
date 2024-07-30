import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateEnergyInput {
  @Field(() => Int)
  energy: number;
}
