import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateEnergyInput } from './dto/update-energy.input';
import { UserEntity } from './entities/user/user.entity';
import { TaskService } from '../tasks/task.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private taskService: TaskService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<UserEntity> {
    const user = this.userRepository.create(createUserInput);
    const savedUser = await this.userRepository.save(user);

    const tasks = await this.taskService.findAllTasks();
    savedUser.tasks = tasks;
    return this.userRepository.save(savedUser);
  }

  async assignTaskToUser(userId: number, taskId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['tasks'],
    });

    const task = await this.taskService.findOne(taskId);
    if (user && task && !user.tasks.includes(task)) {
      user.tasks.push(task);
      await this.userRepository.save(user);
    }

    return user;
  }

  async unassignTaskFromUser(
    userId: number,
    taskId: number,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['tasks'],
    });

    if (user) {
      user.tasks = user.tasks.filter((task) => task.id !== taskId);
      await this.userRepository.save(user);
    }

    return user;
  }

  async findOne(telegramId: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { telegramId },
      relations: ['tasks'],
    });
  }

  async findUserTasks(telegramId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { telegramId },
      relations: ['tasks'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${telegramId} not found`);
    }
    return user;
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
