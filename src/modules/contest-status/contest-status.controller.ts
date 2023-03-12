import { Controller, Get, UseGuards } from '@nestjs/common';
import { ContestStatusService } from './contest-status.service';
import JwtAuthGuard from '../auth/jwt.auth.guard';

@Controller('contest-statuses')
@UseGuards(JwtAuthGuard)
export class ContestStatusController {
  constructor(private readonly contestStatusService: ContestStatusService) {}

  @Get()
  getAll() {
    return this.contestStatusService.getAll();
  }
}
