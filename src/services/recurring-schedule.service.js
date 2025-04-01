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
exports.recurringScheduleService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const schedule_service_1 = require("./schedule.service");
exports.recurringScheduleService = {
    generateSchedules(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const recurringSchedules = yield prisma_1.default.recurringSchedule.findMany({
                include: {
                    church: true,
                    musicians: true
                }
            });
            const generatedSchedules = [];
            const currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                for (const recurring of recurringSchedules) {
                    if (this.shouldGenerate(recurring, currentDate)) {
                        const schedule = yield schedule_service_1.scheduleService.createSchedule({
                            date: new Date(currentDate),
                            churchId: recurring.churchId,
                            musicianIds: recurring.musicians.map(m => m.id),
                            description: recurring.description || `Escala recorrente: ${recurring.church.name}`
                        });
                        generatedSchedules.push(schedule);
                    }
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
            return generatedSchedules;
        });
    },
    shouldGenerate(recurring, date) {
        const dayMatches = date.getDay() === recurring.dayOfWeek;
        if (recurring.frequency === 'WEEKLY')
            return dayMatches;
        if (recurring.frequency === 'BIWEEKLY') {
            return dayMatches && Math.floor(date.getDate() / 7) % 2 === 0;
        }
        if (recurring.frequency === 'MONTHLY') {
            return dayMatches && date.getDate() <= 7;
        }
        return false;
    }
};
