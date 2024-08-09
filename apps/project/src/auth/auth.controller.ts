import {Body, Controller, Inject, OnModuleInit, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "./dto/create-user.dto";

import { loginUserDto } from './dto/login-user.dto';
import { Users } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController implements OnModuleInit {
    constructor(@Inject("AUTH_SERVICE") private readonly authServiceClient: ClientProxy) {}
  
    onModuleInit() {
      try {
        this.authServiceClient.connect();
      }
      catch (err) {
        throw new Error(err.message)
      }
    }
      
    @ApiOperation({summary: "User Login"})
    @ApiResponse({status:200, type:String})
    @Post('/login')
    async login(@Body() loginDto: loginUserDto) {
        try {
      return await firstValueFrom(
        this.authServiceClient.send('auth_signin', {loginuserDto:loginDto} ),
      );     }
      catch (err) { }   
    }
    
    @ApiOperation({summary: "Create User"})
    @ApiResponse({status:200, type:Users})
    @Post('/registration')
    async registration(@Body() userDto: CreateUserDto) {        
        try {return await firstValueFrom(
          
            this.authServiceClient.send('auth_signup', {userDto:userDto} ),
            
          );} catch (err) {throw new Error(err.message)}
    }
}
