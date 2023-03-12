import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { TokenService } from './token.service';
import { Token } from './token.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    JwtModule.register({}),
    UserModule,
  ],
  exports: [TokenService],
  providers: [TokenService],
})
export class TokenModule {}
