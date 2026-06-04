import dotenv from "dotenv";
import mongoose from "mongoose";
import AptitudeQuestion from "./models/AptitudeQuestion.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const count = await AptitudeQuestion.countDocuments();
  console.log("aptitude count", count);
  const sample = await AptitudeQuestion.find().limit(3).lean();
  console.log(JSON.stringify(sample, null, 2));
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err.stack || err.message);
  process.exit(1);
});
