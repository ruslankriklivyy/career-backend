import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Token } from './token.entity';
import { IUser } from 'src/types/entities/User';
import { ISaveTokenPayload } from './token.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(payload: IUser) {
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      secret: this.configService.get('JWT_ACCESS_SECRET'),
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async saveToken(payload: ISaveTokenPayload) {
    try {
      const { user, refresh_token } = payload;

      const tokenData = await this.tokenRepository.findOneBy({
        user: { id: user.id },
      });

      if (tokenData) {
        tokenData.refresh_token = refresh_token;
        return tokenData.save();
      }

      const newToken = await this.tokenRepository.save({
        user,
        refresh_token,
      });

      await this.userService.updateOne(user.id, { token: { id: newToken.id } });

      return newToken;
    } catch (error) {
      throw error;
    }
  }

  removeToken(refreshToken: string) {
    return this.tokenRepository.delete({ refresh_token: refreshToken });
  }

  findRefreshToken(refreshToken: string) {
    return this.tokenRepository.findOneBy({ refresh_token: refreshToken });
  }

  validateRefreshToken(refreshToken: string) {
    try {
      return this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
    } catch (error) {
      return null;
    }
  }
}
