import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateEnergyInput } from './dto/update-energy.input';
import { UserEntity } from './entities/user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<UserEntity> {
    const user = this.userRepository.create(createUserInput);
    return this.userRepository.save(user);
  }

  async findOne(telegramId: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ telegramId });
  }

  async addEnergy(
    telegramId: string,
    updateEnergyInput: UpdateEnergyInput,
  ): Promise<UserEntity> {
    const user = await this.findOne(telegramId);
    if (!user) {
      throw new Error('User not found');
    }
    user.energy += updateEnergyInput.energy;
    return this.userRepository.save(user);
  }

  async subtractEnergy(
    telegramId: string,
    updateEnergyInput: UpdateEnergyInput,
  ): Promise<UserEntity> {
    const user = await this.findOne(telegramId);
    if (!user) {
      throw new Error('User not found');
    }
    user.energy -= updateEnergyInput.energy;
    return this.userRepository.save(user);
  }
}
