import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '@app/common';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]),
  forwardRef(()=> AuthModule),
  
  
],
  controllers: [],
  providers: [UsersService],
  exports: [
    UsersService,
  ]
})
export class UsersModule { }
