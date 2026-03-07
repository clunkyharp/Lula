import { Module } from '@nestjs/common';
import { PetModule } from '../pet/pet.module';
import { StatsModule } from '../stats/stats.module';
import { QuestStreakModule } from '../quest-streak/quest-streak.module';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
  imports: [PetModule, StatsModule, QuestStreakModule],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService]
})
export class SessionModule {}
