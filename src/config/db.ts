import { connect } from "mongoose";

async function connectDB() {
  try {
    const db = await connect('mongodb+srv://tikoDev21:sisi20012019VRMONGO@cluster.6kdr2.mongodb.net/?retryWrites=true&w=majority');

    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(`Mongo connected to ${url}`);

  } catch (error) {
    console.log(error);
  }
}

export default connectDB;