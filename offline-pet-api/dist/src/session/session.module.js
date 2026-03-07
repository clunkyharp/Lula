"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModule = void 0;
const common_1 = require("@nestjs/common");
const pet_module_1 = require("../pet/pet.module");
const stats_module_1 = require("../stats/stats.module");
const quest_streak_module_1 = require("../quest-streak/quest-streak.module");
const session_controller_1 = require("./session.controller");
const session_service_1 = require("./session.service");
let SessionModule = class SessionModule {
};
exports.SessionModule = SessionModule;
exports.SessionModule = SessionModule = __decorate([
    (0, common_1.Module)({
        imports: [pet_module_1.PetModule, stats_module_1.StatsModule, quest_streak_module_1.QuestStreakModule],
        controllers: [session_controller_1.SessionController],
        providers: [session_service_1.SessionService],
        exports: [session_service_1.SessionService]
    })
], SessionModule);
//# sourceMappingURL=session.module.js.map