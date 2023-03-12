import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './user.service';
import JwtAuthGuard from '../auth/jwt.auth.guard';

@Controller('')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-user')
  getOne(@Req() req: Request) {
    const { refresh_token } = req.cookies;
    return this.userService.getUser(refresh_token);
  }
}
