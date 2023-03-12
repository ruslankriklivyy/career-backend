import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { IRequestWithUser } from 'src/types/entities/User';
import JwtAuthGuard from './jwt.auth.guard';
import { LoginDto } from './dto/login.dto';
import { TokenService } from '../token/token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  async register(
    @Body() body,
    @Req() req: IRequestWithUser,
    @Res({ passthrough: true }) res: Response,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    const data = await this.authService.register({ body, avatar });
    req.user = data.user;
    res.cookie('refresh_token', data.refresh_token, {
      maxAge: +this.configService.get('REFRESH_COOKIE_MAX_AGE'),
      path: '/',
      sameSite: 'strict',
    });
    return data;
  }

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Req() req: IRequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.login(body);
    req.user = data.user;
    res.cookie('refresh_token', data.refresh_token, {
      maxAge: +this.configService.get('REFRESH_COOKIE_MAX_AGE'),
      path: '/',
      sameSite: 'strict',
    });
    return data;
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refresh_token } = req.cookies;
    const data = await this.authService.refresh(refresh_token);

    res.cookie('refresh_token', data.refresh_token, {
      maxAge: +this.configService.get('REFRESH_COOKIE_MAX_AGE'),
      path: '/',
      sameSite: 'strict',
    });

    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  checkAuth(@Req() request: IRequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: IRequestWithUser, @Res() res: Response) {
    const { refresh_token } = req.cookies;

    res.set('Authorization', '');
    res.clearCookie('refresh_token');
    req.user = null;

    return this.tokenService.removeToken(refresh_token);
  }
}
