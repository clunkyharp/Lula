import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { InMemoryDb } from '../db/in-memory.db';

function dateKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

@Injectable()
export class StatsService {
  constructor(private readonly db: InMemoryDb) {}

  getToday(userId: string) {
    const key = `${userId}:${dateKey()}`;
    return this.db.dailyStats.get(key) ?? this.createEmpty(userId, dateKey());
  }

  getWeek(userId: string) {
    const today = new Date();
    const result = [];
    for (let i = 0; i < 7; i++) {
      const dt = new Date(today);
      dt.setDate(today.getDate() - i);
      const keyDate = dateKey(dt);
      const key = `${userId}:${keyDate}`;
      result.push(this.db.dailyStats.get(key) ?? this.createEmpty(userId, keyDate));
    }
    return result;
  }

  applyMinute(userId: string, violated: boolean) {
    const record = this.getToday(userId);
    if (violated) {
      record.onlineMinutes += 1;
    } else {
      record.offlineMinutes += 1;
    }
    this.db.dailyStats.set(`${userId}:${record.date}`, record);
  }

  closeSession(userId: string, hadViolations: boolean) {
    const record = this.getToday(userId);
    if (hadViolations) {
      record.failedSessions += 1;
    } else {
      record.successfulSessions += 1;
    }
    this.db.dailyStats.set(`${userId}:${record.date}`, record);
  }

  private createEmpty(userId: string, date: string) {
    return {
      id: uuid(),
      userId,
      date,
      offlineMinutes: 0,
      onlineMinutes: 0,
      successfulSessions: 0,
      failedSessions: 0
    };
  }
}
