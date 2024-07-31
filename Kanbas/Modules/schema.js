import mongoose from "mongoose";
import { ObjectId } from "mongodb";
const lessonSchema = new mongoose.Schema({
  id: String,
  description: String,
  module: String,
});

const moduleSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  description: String,
  course: { type: String, required: true },
  lessons: {
    type: [lessonSchema],
    default: []
  },
}, { collection: "modules" });

export default moduleSchema;
