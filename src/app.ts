import express from 'express';
import adminRoutes from './routes/AdminRoutes';

const app = express();

app.use('/api/admin', adminRoutes);


export default app;