import mongoose from "mongoose";

let isConnected;

const ConnectDB = async () => {
  try {
    if (isConnected) {
      console.log("Using existing database connection");
      return;
    }

    const db = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Connection to MongoDB failed:", error.message);
    throw new Error("Unable to connect to MongoDB");
  }
};

export default ConnectDB;
