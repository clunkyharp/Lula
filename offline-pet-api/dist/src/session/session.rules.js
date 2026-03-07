"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewardForMinute = rewardForMinute;
function rewardForMinute(violated) {
    if (violated) {
        return {
            coins: 0,
            xp: 0,
            cleanMinutes: 0,
            violatedMinutes: 1,
            violations: 1
        };
    }
    return {
        coins: 1,
        xp: 2,
        cleanMinutes: 1,
        violatedMinutes: 0,
        violations: 0
    };
}
//# sourceMappingURL=session.rules.js.map