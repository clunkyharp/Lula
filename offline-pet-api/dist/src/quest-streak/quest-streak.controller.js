"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestStreakController = void 0;
const common_1 = require("@nestjs/common");
const quest_streak_service_1 = require("./quest-streak.service");
function extractUserId(headers) {
    const userId = headers['x-user-id'];
    return Array.isArray(userId) ? userId[0] : userId ?? 'demo-user';
}
let QuestStreakController = class QuestStreakController {
    constructor(questStreakService) {
        this.questStreakService = questStreakService;
    }
    todayQuests(headers) {
        return this.questStreakService.getTodayQuests(extractUserId(headers));
    }
    streak(headers) {
        return this.questStreakService.getStreak(extractUserId(headers));
    }
};
exports.QuestStreakController = QuestStreakController;
__decorate([
    (0, common_1.Get)('quests/today'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuestStreakController.prototype, "todayQuests", null);
__decorate([
    (0, common_1.Get)('streak'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuestStreakController.prototype, "streak", null);
exports.QuestStreakController = QuestStreakController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [quest_streak_service_1.QuestStreakService])
], QuestStreakController);
//# sourceMappingURL=quest-streak.controller.js.map