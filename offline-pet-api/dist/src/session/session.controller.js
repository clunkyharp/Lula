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
exports.SessionController = void 0;
const common_1 = require("@nestjs/common");
const session_service_1 = require("./session.service");
const dto_1 = require("./dto");
function extractUserId(headers) {
    const userId = headers['x-user-id'];
    return Array.isArray(userId) ? userId[0] : userId ?? 'demo-user';
}
let SessionController = class SessionController {
    constructor(sessionService) {
        this.sessionService = sessionService;
    }
    start(headers, payload) {
        return this.sessionService.start(extractUserId(headers), payload);
    }
    tick(headers, payload) {
        return this.sessionService.tick(extractUserId(headers), payload);
    }
    end(headers, payload) {
        return this.sessionService.end(extractUserId(headers), payload);
    }
};
exports.SessionController = SessionController;
__decorate([
    (0, common_1.Post)('start'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.SessionStartDto]),
    __metadata("design:returntype", void 0)
], SessionController.prototype, "start", null);
__decorate([
    (0, common_1.Post)('tick'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.SessionTickDto]),
    __metadata("design:returntype", void 0)
], SessionController.prototype, "tick", null);
__decorate([
    (0, common_1.Post)('end'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.SessionEndDto]),
    __metadata("design:returntype", void 0)
], SessionController.prototype, "end", null);
exports.SessionController = SessionController = __decorate([
    (0, common_1.Controller)('session'),
    __metadata("design:paramtypes", [session_service_1.SessionService])
], SessionController);
//# sourceMappingURL=session.controller.js.map