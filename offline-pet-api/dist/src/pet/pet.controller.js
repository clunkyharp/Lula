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
exports.PetController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const pet_service_1 = require("./pet.service");
function extractUserId(headers) {
    const userId = headers['x-user-id'];
    return Array.isArray(userId) ? userId[0] : userId ?? 'demo-user';
}
let PetController = class PetController {
    constructor(petService) {
        this.petService = petService;
    }
    getPet(headers) {
        return this.petService.getByUser(extractUserId(headers));
    }
    createPet(headers, payload) {
        return this.petService.getOrCreate(extractUserId(headers), payload);
    }
    feed(headers) {
        return this.petService.feed(extractUserId(headers));
    }
    play(headers) {
        return this.petService.play(extractUserId(headers));
    }
    heal(headers) {
        return this.petService.heal(extractUserId(headers));
    }
};
exports.PetController = PetController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PetController.prototype, "getPet", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreatePetDto]),
    __metadata("design:returntype", void 0)
], PetController.prototype, "createPet", null);
__decorate([
    (0, common_1.Post)('feed'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PetController.prototype, "feed", null);
__decorate([
    (0, common_1.Post)('play'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PetController.prototype, "play", null);
__decorate([
    (0, common_1.Post)('heal'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PetController.prototype, "heal", null);
exports.PetController = PetController = __decorate([
    (0, common_1.Controller)('pet'),
    __metadata("design:paramtypes", [pet_service_1.PetService])
], PetController);
//# sourceMappingURL=pet.controller.js.map