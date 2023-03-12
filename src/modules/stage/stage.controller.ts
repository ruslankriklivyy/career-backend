import { Controller, Get, UseGuards } from '@nestjs/common';
import { StageService } from './stage.service';
import JwtAuthGuard from '../auth/jwt.auth.guard';

@Controller('stages')
@UseGuards(JwtAuthGuard)
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Get()
  getAll() {
    return this.stageService.getAll();
  }
}
