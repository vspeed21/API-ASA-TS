import express from 'express';
import AdminRoutes from './routes/AdminRoutes';

const app = express();

app.use('/api/admin', AdminRoutes);


export default app;