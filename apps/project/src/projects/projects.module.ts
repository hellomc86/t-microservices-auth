import { forwardRef, Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '@app/common/entities/project.entity';

import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([Project]),
  
  JwtModule.register({
    secret: process.env.PRIVATE_KEY || 'SECRET',
    signOptions: {
      expiresIn: '24h'
    }
  })
],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService, 
    JwtModule
  ],
})
export class ProjectsModule {}
