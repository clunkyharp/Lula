import { AppDispatch, RootState } from '../store';
import { addOfflineMinute, addOnlineMinute, commitSessionForStreak } from '../store/slices/statsSlice';
import { applyNeglectPenalty, applyXp } from '../store/slices/petSlice';
import { endSession, tickSession } from '../store/slices/sessionSlice';
import { detectViolation } from './platformUsage';

export class FocusEngine {
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(private readonly dispatch: AppDispatch, private readonly getState: () => RootState) {}

  start() {
    if (this.timer) return;
    this.timer = setInterval(async () => {
      const state = this.getState();
      if (!state.session.active) {
        this.stop();
        return;
      }

      const violation = await detectViolation();
      this.dispatch(tickSession({ violated: violation.violated, reason: violation.reason }));

      if (violation.violated) {
        this.dispatch(addOnlineMinute());
        this.dispatch(applyNeglectPenalty());
      } else {
        this.dispatch(addOfflineMinute());
        this.dispatch(applyXp(2));
      }

      const latest = this.getState();
      if (!latest.session.active) {
        this.dispatch(endSession());
        this.dispatch(commitSessionForStreak(latest.session.cleanMinutes));
        this.stop();
      }
    }, 60_000);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
