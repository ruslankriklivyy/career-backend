import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserService } from 'src/modules/user/user.service';
import { PostgresErrorCode } from 'src/database/constraints/errors.constraint';
import {
  IGetUserPayload,
  ILoginPayload,
  IRegisterPayload,
  IVerifyPasswordPayload,
} from './auth.interface';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  public async register(payload: IRegisterPayload) {
    const dirtyData =
      (payload.body?.data && JSON.parse(payload.body.data)) || {};
    const { password, phones } = dirtyData;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const createdUser = await this.userService.create({
        user: {
          ...dirtyData,
          password: hashedPassword,
          phones,
        },
        avatar: payload?.avatar || null,
      });

      const { access_token, refresh_token } =
        await this.tokenService.generateTokens({ ...createdUser });

      await this.tokenService.saveToken({
        user: { ...createdUser },
        refresh_token,
      });
      return { access_token, refresh_token, user: createdUser };
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email or rnokpp already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async login(payload: ILoginPayload) {
    const { email, password } = payload;

    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword({
        password,
        hashedPassword: user.password,
      });

      user.password = undefined;

      const { access_token, refresh_token } =
        await this.tokenService.generateTokens({ ...user });

      await this.tokenService.saveToken({
        user: { ...user },
        refresh_token,
      });

      return { access_token, refresh_token, user };
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const decodedData = await this.tokenService.validateRefreshToken(
      refreshToken,
    );

    if (!decodedData) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = await this.userService.getByEmail(decodedData?.email);
    const token = await this.tokenService.findRefreshToken(refreshToken);

    if (!token) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { access_token, refresh_token } =
      await this.tokenService.generateTokens(user);
    await this.tokenService.saveToken({ user, refresh_token });

    return { access_token, refresh_token, user };
  }

  public async getUser(payload: IGetUserPayload) {
    const { email, hashedPassword } = payload;

    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword({ password: user.password, hashedPassword });
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async verifyPassword(payload: IVerifyPasswordPayload) {
    const { password, hashedPassword } = payload;
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
