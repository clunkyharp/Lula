import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { InMemoryDb } from '../db/in-memory.db';

const QUEST_TARGETS = [60, 120, 240];

function dateKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

@Injectable()
export class QuestStreakService {
  constructor(private readonly db: InMemoryDb) {}

  getTodayQuests(userId: string) {
    const today = dateKey();
    const quests = QUEST_TARGETS.map((target) => {
      const key = `${userId}:${today}:${target}`;
      const existing = this.db.quests.get(key);
      if (existing) return existing;
      const quest = {
        id: uuid(),
        userId,
        targetMinutes: target,
        completed: false,
        rewardCoins: target / 2,
        rewardXp: target,
        date: today
      };
      this.db.quests.set(key, quest);
      return quest;
    });
    return quests;
  }

  getStreak(userId: string) {
    const existing = this.db.streaks.get(userId);
    if (existing) return existing;
    const streak = {
      id: uuid(),
      userId,
      current: 0,
      longest: 0,
      updatedAt: new Date().toISOString()
    };
    this.db.streaks.set(userId, streak);
    return streak;
  }

  trackMinute(userId: string, cleanMinute: boolean) {
    if (!cleanMinute) return;
    const totalClean = this.db.dailyStats.get(`${userId}:${dateKey()}`)?.offlineMinutes ?? 0;
    const quests = this.getTodayQuests(userId);

    quests.forEach((quest) => {
      if (!quest.completed && totalClean >= quest.targetMinutes) {
        quest.completed = true;
        this.db.quests.set(`${userId}:${quest.date}:${quest.targetMinutes}`, quest);
      }
    });
  }

  closeSession(userId: string, cleanMinutes: number) {
    const streak = this.getStreak(userId);
    if (cleanMinutes >= 60) {
      streak.current += 1;
      streak.longest = Math.max(streak.longest, streak.current);
    } else {
      streak.current = 0;
    }
    streak.updatedAt = new Date().toISOString();
    this.db.streaks.set(userId, streak);
  }
}
