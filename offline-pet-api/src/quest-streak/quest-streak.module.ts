import { Module } from '@nestjs/common';
import { QuestStreakController } from './quest-streak.controller';
import { QuestStreakService } from './quest-streak.service';

@Module({
  controllers: [QuestStreakController],
  providers: [QuestStreakService],
  exports: [QuestStreakService]
})
export class QuestStreakModule {}
