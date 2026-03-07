import { Controller, Get, Headers } from '@nestjs/common';
import { StatsService } from './stats.service';

function extractUserId(headers: Record<string, string | string[] | undefined>): string {
  const userId = headers['x-user-id'];
  return Array.isArray(userId) ? userId[0] : userId ?? 'demo-user';
}

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('today')
  today(@Headers() headers: Record<string, string | string[] | undefined>) {
    return this.statsService.getToday(extractUserId(headers));
  }

  @Get('week')
  week(@Headers() headers: Record<string, string | string[] | undefined>) {
    return this.statsService.getWeek(extractUserId(headers));
  }
}
