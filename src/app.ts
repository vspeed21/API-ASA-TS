import express from 'express';
import adminRoutes from './routes/AdminRoutes';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/admin', adminRoutes);


export default app;