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
exports.musicianService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
exports.musicianService = {
    createMusician(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.musician.create({
                data: {
                    name: data.name,
                    email: data.email,
                    instruments: data.instruments
                }
            });
        });
    },
    getAvailableMusicians(date, instrument) {
        return __awaiter(this, void 0, void 0, function* () {
            const whereClause = {
                schedules: {
                    none: {
                        date: {
                            equals: date
                        }
                    }
                }
            };
            if (instrument) {
                whereClause.instruments = {
                    has: instrument
                };
            }
            return prisma_1.default.musician.findMany({
                where: whereClause
            });
        });
    },
    getMusicianById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.musician.findUnique({
                where: { id },
                include: {
                    schedules: true,
                    recurringSchedules: true
                }
            });
        });
    },
    updateMusician(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.musician.update({
                where: { id },
                data: {
                    name: data.name,
                    email: data.email,
                    instruments: data.instruments
                }
            });
        });
    },
    deleteMusician(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.musician.delete({
                where: { id }
            });
        });
    }
};
