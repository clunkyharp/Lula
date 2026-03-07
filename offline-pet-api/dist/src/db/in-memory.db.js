"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDb = void 0;
const common_1 = require("@nestjs/common");
let InMemoryDb = class InMemoryDb {
    constructor() {
        this.users = new Map();
        this.oauthIdentities = new Map();
        this.pets = new Map();
        this.sessions = new Map();
        this.sessionEvents = new Map();
        this.dailyStats = new Map();
        this.quests = new Map();
        this.streaks = new Map();
    }
};
exports.InMemoryDb = InMemoryDb;
exports.InMemoryDb = InMemoryDb = __decorate([
    (0, common_1.Injectable)()
], InMemoryDb);
//# sourceMappingURL=in-memory.db.js.map