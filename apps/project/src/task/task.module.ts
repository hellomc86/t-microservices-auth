import { forwardRef, Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '@app/common/entities/task.entity';
import { TasklistModule } from '../tasklist/tasklist.module';


import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]),

  ProjectsModule,
  TasklistModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule { }
