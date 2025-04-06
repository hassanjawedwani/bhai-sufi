import { connect } from "mongoose";

async function connectDB() {
  try {
    await connect(`${process.env.MONGODB_URL}`);
    console.log("Database Connected");
  } catch (err) {
    console.log("Database Connection error: ", err);
    process.exit(1);
  }
}

export default connectDB;