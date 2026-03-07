import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PetModule } from './pet/pet.module';
import { SessionModule } from './session/session.module';
import { StatsModule } from './stats/stats.module';
import { QuestStreakModule } from './quest-streak/quest-streak.module';
import { NotificationModule } from './notification/notification.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [DbModule, AuthModule, PetModule, SessionModule, StatsModule, QuestStreakModule, NotificationModule]
})
export class AppModule {}
