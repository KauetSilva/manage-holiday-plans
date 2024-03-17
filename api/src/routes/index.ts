import express from 'express';
import HolidayRoute from './holiday.route';

const router = express.Router();

router.use('/', HolidayRoute);

export default router;
