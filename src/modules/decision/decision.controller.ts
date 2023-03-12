import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { DecisionService } from './decision.service';
import { PaginationParams } from '../contest/dto/pagination.dto';
import JwtAuthGuard from '../auth/jwt.auth.guard';
import RoleGuard from '../auth/role.guard';
import { Role } from '../auth/role.enum';
import { IRequestWithUser } from '../../types/entities/User';

@Controller('decisions')
@UseGuards(JwtAuthGuard)
export class DecisionController {
  constructor(private readonly decisionService: DecisionService) {}

  @Get()
  getAll(@Query() query, @Query() { page, per_page }: PaginationParams) {
    return this.decisionService.getAll({
      ...query,
      pagination: { page, per_page },
    });
  }

  @UseGuards(RoleGuard(Role.Admin))
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  createOne(
    @Req() req: IRequestWithUser,
    @Body() body,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.decisionService.createOne({
      data: body.data,
      userId: req.user.id,
      files,
    });
  }

  @UseGuards(RoleGuard(Role.Admin))
  @Put('/:id')
  @UseInterceptors(FilesInterceptor('files'))
  updateOne(
    @Req() req: IRequestWithUser,
    @Param() { id },
    @Body() body,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.decisionService.updateOne(id, {
      data: body.data,
      userId: req.user.id,
      files,
    });
  }
}
