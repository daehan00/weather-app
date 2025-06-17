// server/src/app.ts
import express from 'express';
import cors from 'cors';
import weatherRouter from './routes/weather';

const app = express();
app.use(express.json());
app.use(cors());

// API 라우트 등록
app.use('/api/weather', weatherRouter);

export default app;
