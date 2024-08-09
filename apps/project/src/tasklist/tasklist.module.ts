import { forwardRef, Module } from '@nestjs/common';
import { TasklistService } from './tasklist.service';
import { TasklistController } from './tasklist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasklist } from '@app/common/entities/tasklist.entity';
import { ProjectsModule } from '../projects/projects.module';



@Module({
  imports: [TypeOrmModule.forFeature([Tasklist]),

  ProjectsModule,
],
  controllers: [TasklistController],
  providers: [TasklistService],
  exports: [TasklistService],
})
export class TasklistModule {}
