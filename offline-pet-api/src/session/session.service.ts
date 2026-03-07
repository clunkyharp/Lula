import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { InMemoryDb } from '../db/in-memory.db';
import { PetService } from '../pet/pet.service';
import { StatsService } from '../stats/stats.service';
import { QuestStreakService } from '../quest-streak/quest-streak.service';
import { SessionEndDto, SessionStartDto, SessionTickDto } from './dto';
import { rewardForMinute } from './session.rules';

@Injectable()
export class SessionService {
  constructor(
    private readonly db: InMemoryDb,
    private readonly petService: PetService,
    private readonly statsService: StatsService,
    private readonly questStreakService: QuestStreakService
  ) {}

  start(userId: string, payload: SessionStartDto) {
    const pet = this.petService.getByUser(userId);
    if (!pet.alive) {
      throw new NotFoundException('Pet is dead. Session unavailable.');
    }

    const id = uuid();
    const session = {
      id,
      userId,
      plannedMinutes: payload.plannedMinutes,
      cleanMinutes: 0,
      violatedMinutes: 0,
      violations: 0,
      earnedCoins: 0,
      earnedXp: 0,
      status: 'active' as const,
      startTime: new Date().toISOString()
    };
    this.db.sessions.set(id, session);
    return session;
  }

  tick(userId: string, payload: SessionTickDto) {
    const session = this.db.sessions.get(payload.sessionId);
    if (!session || session.userId !== userId || session.status !== 'active') {
      throw new NotFoundException('Active session not found');
    }

    const delta = rewardForMinute(payload.violated);
    session.cleanMinutes += delta.cleanMinutes;
    session.violatedMinutes += delta.violatedMinutes;
    session.violations += delta.violations;
    session.earnedCoins += delta.coins;
    session.earnedXp += delta.xp;

    this.db.sessions.set(session.id, session);

    const eventId = uuid();
    this.db.sessionEvents.set(eventId, {
      id: eventId,
      sessionId: session.id,
      minuteIndex: payload.minuteIndex,
      violated: payload.violated,
      reason: payload.reason,
      createdAt: new Date().toISOString()
    });

    if (payload.violated) {
      this.petService.degradeForNeglect(userId, 5);
    } else {
      this.petService.applyXp(userId, delta.xp);
    }

    this.statsService.applyMinute(userId, payload.violated);
    this.questStreakService.trackMinute(userId, !payload.violated);

    return session;
  }

  end(userId: string, payload: SessionEndDto) {
    const session = this.db.sessions.get(payload.sessionId);
    if (!session || session.userId !== userId || session.status !== 'active') {
      throw new NotFoundException('Active session not found');
    }

    session.status = 'ended';
    session.endTime = new Date().toISOString();
    this.db.sessions.set(session.id, session);
    this.statsService.closeSession(userId, session.violations > 0);
    this.questStreakService.closeSession(userId, session.cleanMinutes);

    return session;
  }
}
