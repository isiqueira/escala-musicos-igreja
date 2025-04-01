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
exports.scheduleService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
exports.scheduleService = {
    createSchedule(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return prisma_1.default.schedule.create({
                data: {
                    date: data.date,
                    description: data.description,
                    churchId: data.churchId,
                    musicians: {
                        connect: ((_a = data.musicianIds) === null || _a === void 0 ? void 0 : _a.map(id => ({ id }))) || []
                    }
                },
                include: {
                    church: true,
                    musicians: true
                }
            });
        });
    },
    getScheduleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.schedule.findUnique({
                where: { id },
                include: {
                    church: true,
                    musicians: true
                }
            });
        });
    },
    getSchedulesByChurch(churchId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.schedule.findMany({
                where: { churchId },
                include: {
                    church: true,
                    musicians: true
                },
                orderBy: { date: 'asc' }
            });
        });
    },
    getUpcomingSchedules() {
        return __awaiter(this, arguments, void 0, function* (days = 30) {
            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(startDate.getDate() + days);
            return prisma_1.default.schedule.findMany({
                where: {
                    date: {
                        gte: startDate,
                        lte: endDate
                    }
                },
                include: {
                    church: true,
                    musicians: true
                },
                orderBy: { date: 'asc' }
            });
        });
    },
    updateSchedule(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return prisma_1.default.schedule.update({
                where: { id },
                data: {
                    date: data.date,
                    description: data.description,
                    musicians: {
                        set: ((_a = data.musicianIds) === null || _a === void 0 ? void 0 : _a.map(id => ({ id }))) || []
                    }
                },
                include: {
                    church: true,
                    musicians: true
                }
            });
        });
    },
    deleteSchedule(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.schedule.delete({
                where: { id }
            });
        });
    }
};
