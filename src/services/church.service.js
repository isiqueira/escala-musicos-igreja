"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.churchService = void 0;
// src/services/church.service.ts
const prisma_1 = __importDefault(require("../lib/prisma"));
exports.churchService = {
    createChurch(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.church.create({
                data: {
                    name: data.name,
                    description: data.description,
                    address: data.address
                },
                include: {
                    schedules: true,
                    recurringSchedules: true
                }
            });
        });
    },
    getAllChurches() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.church.findMany({
                include: {
                    schedules: true,
                    recurringSchedules: true
                }
            });
        });
    },
    getChurchById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.church.findUnique({
                where: { id },
                include: {
                    schedules: true,
                    recurringSchedules: true
                }
            });
        });
    },
    updateChurch(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.church.update({
                where: { id },
                data,
                include: {
                    schedules: true,
                    recurringSchedules: true
                }
            });
        });
    },
    deleteChurch(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.church.delete({
                where: { id }
            });
        });
    }
};
