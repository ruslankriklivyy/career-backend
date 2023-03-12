import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ContestService } from './contest.service';
import { PaginationParams } from './dto/pagination.dto';
import { CreateContestDto } from './dto/create-contest.dto';
import { UpdateContestDto } from './dto/update-contest.dto';
import RoleGuard from '../auth/role.guard';
import { Role } from '../auth/role.enum';
import JwtAuthGuard from '../auth/jwt.auth.guard';

@Controller('contests')
@UseGuards(JwtAuthGuard)
export class ContestController {
  constructor(private readonly contestService: ContestService) {}

  @Get()
  getAll(@Query() query, @Query() { page, per_page }: PaginationParams) {
    return this.contestService.getAll({
      ...query,
      pagination: { page, per_page },
    });
  }

  @Get('/:id')
  getOne(@Param() { id }) {
    return this.contestService.getOne(id);
  }

  @UseGuards(RoleGuard(Role.Admin))
  @Post()
  createOne(@Body() body: CreateContestDto) {
    return this.contestService.createOne(body);
  }

  @UseGuards(RoleGuard(Role.Admin))
  @Put('/:id')
  updateOne(@Param() { id }, @Body() body: UpdateContestDto) {
    return this.contestService.updateOne(+id, body);
  }

  @Put('/:contestId/current-contest-stage/:contestStageId')
  updateCurrentContestStage(@Param() { contestId, contestStageId }) {
    return this.contestService.updateCurrentContestStage(
      contestId,
      contestStageId,
    );
  }
}
