import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null = null;

async function dbConnect(): Promise<typeof mongoose> {
  if (cachedConnection) {
    console.log("Using existing database connection");
    return cachedConnection;
  }

  if (!process.env.MONGODB_URL) {
    throw new Error("Please define the MONGODB_URL environment variable");
  }

  try {
    const opts = {
      bufferCommands: false,
    };

    const connection = await mongoose.connect(process.env.MONGODB_URL, opts);
    cachedConnection = connection;
    console.log("New database connection established");
    return connection;
  } catch (error) {
    console.error("Database connection failed", error);
    throw error; // Re-throw the error instead of exiting the process
  }
}

export default dbConnect;
