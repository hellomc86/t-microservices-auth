
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern('auth_signup')
  async signUp(data) {
    return await this.authService.registration(data.userDto);
  }

  @MessagePattern('auth_signin')
  async signIn(data) {
    return await this.authService.login(data.loginuserDto);
  }
}