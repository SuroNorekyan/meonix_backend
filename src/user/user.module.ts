import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserEntity } from './entities/user/user.entity';
import { TaskModule } from '../tasks/task.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), TaskModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
