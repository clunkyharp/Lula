"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestStreakModule = void 0;
const common_1 = require("@nestjs/common");
const quest_streak_controller_1 = require("./quest-streak.controller");
const quest_streak_service_1 = require("./quest-streak.service");
let QuestStreakModule = class QuestStreakModule {
};
exports.QuestStreakModule = QuestStreakModule;
exports.QuestStreakModule = QuestStreakModule = __decorate([
    (0, common_1.Module)({
        controllers: [quest_streak_controller_1.QuestStreakController],
        providers: [quest_streak_service_1.QuestStreakService],
        exports: [quest_streak_service_1.QuestStreakService]
    })
], QuestStreakModule);
//# sourceMappingURL=quest-streak.module.js.map