import express from 'express';
import adminRoutes from './routes/adminRoutes';
import profileRoutes from './routes/profileRoutes';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);


export default app;