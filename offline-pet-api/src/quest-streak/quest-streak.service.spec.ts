import { InMemoryDb } from '../db/in-memory.db';
import { QuestStreakService } from './quest-streak.service';

describe('QuestStreakService', () => {
  it('starts and resets streak based on clean session duration', () => {
    const db = new InMemoryDb();
    const service = new QuestStreakService(db);

    service.closeSession('u1', 70);
    expect(service.getStreak('u1').current).toBe(1);

    service.closeSession('u1', 20);
    expect(service.getStreak('u1').current).toBe(0);
  });
});
