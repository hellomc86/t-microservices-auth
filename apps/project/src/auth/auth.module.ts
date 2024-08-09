import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';


import {JwtModule} from "@nestjs/jwt";

import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProjectsModule } from '../projects/projects.module';


@Module({
  controllers: [AuthController],
  providers: [],
  imports: [
      JwtModule.register({
        secret: process.env.PRIVATE_KEY || 'SECRET',
        signOptions: {
          expiresIn: '24h'
        }
      }),
      ClientsModule.register([
        {
          name: "AUTH_SERVICE",
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBIT_MQ_URL],
            queue: 'auth-queue',
            
          },
        },
      ]),
      ProjectsModule,           
  ],
    exports: [      
        JwtModule,              
    ]
})
export class AuthModule {}