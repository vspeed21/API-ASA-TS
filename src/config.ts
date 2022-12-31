import dotenv from 'dotenv';

dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI ?? '',
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  USER: process.env.USER ?? '',
  PASS: process.env.PASS ?? '',
}

export default config;