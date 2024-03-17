"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const holiday_service_1 = __importDefault(require("../services/holiday.service"));
const CreateHoliday = zod_1.z.object({
    id: zod_1.z.string().optional(),
    userId: zod_1.z.string().optional(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    date: zod_1.z.union([zod_1.z.string(), zod_1.z.date()]), // Use z.union para permitir mais de um tipo
    icon: zod_1.z.union([zod_1.z.string(), zod_1.z.null()]), // Use z.union para permitir mais de um tipo
});
class HolidayController {
    async createHoliday(req, res) {
        const holidayService = new holiday_service_1.default();
        const { userId, title, description, date, icon } = req.body;
        try {
            const validatedDTO = {
                userId,
                title,
                description,
                date,
                icon
            };
            const result = await holidayService.createHoliday(validatedDTO);
            if (result === "user_not_found") {
                return res.status(404).send({
                    error: `Cliente não encontrado. Digite um ID válido.`,
                });
            }
            else {
                res.status(200).send(result);
            }
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const formattedErrors = error.errors.map((err) => ({
                    path: err.path.join("."),
                    message: err.message,
                }));
                res.status(400).json({ errors: formattedErrors });
            }
            else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
    async getHolidaysByUser(req, res) {
        const holidayService = new holiday_service_1.default();
        const { userId } = req.params;
        const { page, pageSize } = req.query;
        try {
            const pageValue = Number(page) || 1;
            const pageSizeValue = Number(pageSize) || 10;
            const result = await holidayService.getHolidaysByUser(userId, pageValue, pageSizeValue);
            if (result === "user_not_found") {
                return res.status(404).send({
                    error: `Cliente com ID ${userId} não encontrado. Digite um ID válido`,
                });
            }
            else {
                res.status(200).send(result);
            }
        }
        catch (error) {
            console.error("Error processing request:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    async getHolidayById(req, res) {
        const holidayService = new holiday_service_1.default();
        const { holidayId } = req.params;
        try {
            const result = await holidayService.getHolidayById(holidayId);
            if (result === "holiday_not_found") {
                return res.status(404).send({
                    error: `Feriado com ID ${holidayId} não encontrado. Digite um ID válido`,
                });
            }
            else {
                res.status(200).send(result);
            }
        }
        catch (error) {
            console.error("Error processing request:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    async updateHolidayById(req, res) {
        const holidayService = new holiday_service_1.default();
        const { holidayId } = req.params;
        const { title, description, date, icon } = req.body;
        try {
            const result = await holidayService.updateHolidayById(holidayId, title, description, date, icon);
            if (result === "holiday_not_found") {
                return res.status(404).send({
                    error: `Feriado com ID ${holidayId} não encontrado. Digite um ID válido`,
                });
            }
            else {
                res.status(200).send(result);
            }
        }
        catch (error) {
            console.error("Error processing request:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    async deleteHolidayById(req, res) {
        const holidayService = new holiday_service_1.default();
        const { holidayId } = req.params;
        try {
            const result = await holidayService.deleteHolidayById(holidayId);
            if (result === "holiday_not_found") {
                return res.status(404).send({
                    error: `Feriado com ID ${holidayId} não encontrado. Digite um ID válido`,
                });
            }
            else {
                res.status(200).send(result);
            }
        }
        catch (error) {
            console.error("Error processing request:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
exports.default = HolidayController;
