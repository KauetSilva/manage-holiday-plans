"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const holiday_controller_1 = __importDefault(require("../controllers/holiday.controller"));
const routes = (0, express_1.Router)();
const holidayController = new holiday_controller_1.default();
routes.post('/add-holiday', holidayController.createHoliday);
routes.get('/get-holidays/:userId', holidayController.getHolidaysByUser);
routes.get('/get-holiday/:holidayId', holidayController.getHolidayById);
routes.put('/update-holiday/:holidayId', holidayController.updateHolidayById);
routes.delete('/delete-holiday/:holidayId', holidayController.deleteHolidayById);
exports.default = routes;
