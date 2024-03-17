import { Router } from 'express';
import HolidayController from '../controllers/holiday.controller';

const routes = Router();
const holidayController = new HolidayController();

routes.post('/add-holiday', holidayController.createHoliday);
routes.get('/get-holidays/:userId', holidayController.getHolidaysByUser);
routes.get('/get-holiday/:holidayId', holidayController.getHolidayById);
routes.put('/update-holiday/:holidayId', holidayController.updateHolidayById);
routes.delete('/delete-holiday/:holidayId', holidayController.deleteHolidayById);



  
export default routes;