import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { File } from './file.entity';
import { FileService } from './file.service';
import { FileController } from './file.controller';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  exports: [FileService],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
