// server/src/routes/weather.ts
import { Router } from 'express';
import { WeatherService } from '../services/weatherService';

const router = Router();
const wService = new WeatherService();

router.get('/today', async (req, res) => {
  try {
    const location = req.query.location as string;
    const data = await wService.getTodayWeather(location);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '날씨 데이터 조회 실패' });
  }
});

router.get('/week', async (req, res) => {
  try {
    const location = req.query.location as string;
    const data = await wService.getShortTermForecast(location);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '날씨 데이터 조회 실패' });
  }
});

export default router;
