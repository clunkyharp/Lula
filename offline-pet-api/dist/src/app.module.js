"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const pet_module_1 = require("./pet/pet.module");
const session_module_1 = require("./session/session.module");
const stats_module_1 = require("./stats/stats.module");
const quest_streak_module_1 = require("./quest-streak/quest-streak.module");
const notification_module_1 = require("./notification/notification.module");
const db_module_1 = require("./db/db.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [db_module_1.DbModule, auth_module_1.AuthModule, pet_module_1.PetModule, session_module_1.SessionModule, stats_module_1.StatsModule, quest_streak_module_1.QuestStreakModule, notification_module_1.NotificationModule]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map