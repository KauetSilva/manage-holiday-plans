"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class HolidayService {
    async createHoliday(data) {
        try {
            const { userId, title, description, date, icon } = data;
            const user = await prisma.user.findFirst({ where: { id: userId } });
            if (!user) {
                return "user_not_found";
            }
            await prisma.holiday.create({
                data: {
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                    title,
                    description,
                    date: new Date(date),
                    icon,
                },
            });
            const response = {
                title,
                description,
                date: new Date(date),
                icon,
            };
            return response;
        }
        catch (error) {
            console.error("Error creating holiday:", error);
            return "error_creating_holiday";
        }
    }
    async getHolidaysByUser(userId, page = 1, pageSize = 10) {
        try {
            const skip = (page - 1) * pageSize;
            const holidays = await prisma.holiday.findMany({
                where: { userId },
                skip,
                orderBy: { date: 'desc' },
            });
            const totalCount = await prisma.holiday.count({
                where: { userId },
            });
            const totalPages = Math.ceil(totalCount / pageSize);
            const response = {
                holidays: holidays.map((holiday) => ({
                    id: holiday.id,
                    title: holiday.title,
                    description: holiday.description,
                    date: holiday.date,
                    icon: holiday.icon,
                })),
                totalPages,
            };
            return response;
        }
        catch (error) {
            console.error("Error getting holidays by user:", error);
            throw error;
        }
    }
    async getHolidayById(holidayId) {
        try {
            const holiday = await prisma.holiday.findUnique({
                where: { id: holidayId },
            });
            if (!holiday) {
                return "holiday_not_found";
            }
            const response = {
                id: holiday.id,
                title: holiday.title,
                description: holiday.description,
                date: holiday.date,
                icon: holiday.icon,
            };
            return response;
        }
        catch (error) {
            console.error("Error getting holiday by ID:", error);
            throw error;
        }
    }
    async updateHolidayById(holidayId, title, description, date, icon) {
        try {
            const existingHoliday = await prisma.holiday.findUnique({
                where: { id: holidayId },
            });
            if (!existingHoliday) {
                return "holiday_not_found";
            }
            const updatedHoliday = await prisma.holiday.update({
                where: { id: holidayId },
                data: {
                    title: title || existingHoliday.title,
                    description: description || existingHoliday.description,
                    date: new Date(date) || existingHoliday.date,
                    icon: icon || existingHoliday.icon,
                },
            });
            const response = {
                id: updatedHoliday.id,
                title: updatedHoliday.title,
                date: updatedHoliday.date,
                description: updatedHoliday.description,
                icon: updatedHoliday.icon,
            };
            return response;
        }
        catch (error) {
            console.error("Error updating holiday by ID:", error);
            throw error;
        }
    }
    async deleteHolidayById(holidayId) {
        try {
            const existingHoliday = await prisma.holiday.findUnique({
                where: { id: holidayId },
            });
            if (!existingHoliday) {
                return "holiday_not_found";
            }
            const deletedHoliday = await prisma.holiday.delete({
                where: {
                    id: holidayId,
                },
            });
            return deletedHoliday;
        }
        catch (error) {
            console.error("Error delete holiday by ID:", error);
            throw error;
        }
    }
}
exports.default = HolidayService;
