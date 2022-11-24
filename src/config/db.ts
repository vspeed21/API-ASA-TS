import { connect } from "mongoose";
import config from '../config';

async function connectDB() {
  try {
    const db = await connect(config.MONGO_URI);

    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(`Mongo connected to ${url}`);

  } catch (error) {
    console.log(error);
  }
}

export default connectDB;