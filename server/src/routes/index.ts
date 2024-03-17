import express from 'express';
import HolidayRoute from './holiday.route';

const router = express.Router();

router.use('/', HolidayRoute);

router.get('/', (req, res) => {
    res.send('A aplicação está rodando!');
});

export default router;
