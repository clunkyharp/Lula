import { Controller, Get, Headers } from '@nestjs/common';
import { QuestStreakService } from './quest-streak.service';

function extractUserId(headers: Record<string, string | string[] | undefined>): string {
  const userId = headers['x-user-id'];
  return Array.isArray(userId) ? userId[0] : userId ?? 'demo-user';
}

@Controller()
export class QuestStreakController {
  constructor(private readonly questStreakService: QuestStreakService) {}

  @Get('quests/today')
  todayQuests(@Headers() headers: Record<string, string | string[] | undefined>) {
    return this.questStreakService.getTodayQuests(extractUserId(headers));
  }

  @Get('streak')
  streak(@Headers() headers: Record<string, string | string[] | undefined>) {
    return this.questStreakService.getStreak(extractUserId(headers));
  }
}
