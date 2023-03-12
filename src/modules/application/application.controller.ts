import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { ApplicationService } from './application.service';
import { PaginationParams } from '../contest/dto/pagination.dto';
import JwtAuthGuard from '../auth/jwt.auth.guard';
import RoleGuard from '../auth/role.guard';
import { Role } from '../auth/role.enum';
import { IRequestWithUser } from '../../types/entities/User';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  getAll(@Query() query, @Query() { page, per_page }: PaginationParams) {
    return this.applicationService.getAll({
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
    return this.applicationService.createOne({
      data: body.data,
      userId: req.user.id,
      files,
    });
  }
}
