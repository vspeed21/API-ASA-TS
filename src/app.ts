import express from 'express';
import cors, { CorsOptions } from 'cors';

import adminRoutes from './routes/adminRoutes';
import profileRoutes from './routes/profileRoutes';

const app = express();

const whitelist = [process.env.FRONTEND_URL];

const corsOptions:CorsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);


export default app;
