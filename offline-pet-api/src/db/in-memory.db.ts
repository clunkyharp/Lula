import { Injectable } from '@nestjs/common';
import {
  DailyStatsRecord,
  OAuthIdentityRecord,
  PetRecord,
  QuestRecord,
  SessionEventRecord,
  SessionRecord,
  StreakRecord,
  UserRecord
} from '../common/types';

@Injectable()
export class InMemoryDb {
  users = new Map<string, UserRecord>();
  oauthIdentities = new Map<string, OAuthIdentityRecord>();
  pets = new Map<string, PetRecord>();
  sessions = new Map<string, SessionRecord>();
  sessionEvents = new Map<string, SessionEventRecord>();
  dailyStats = new Map<string, DailyStatsRecord>();
  quests = new Map<string, QuestRecord>();
  streaks = new Map<string, StreakRecord>();
}
