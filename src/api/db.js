import mongoose from "mongoose";

const connectionString = process.env.DATABASE_URL;

export const connectDb = () => {
  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
