import mongoose from "mongoose"
const { Schema } = mongoose

/** result model */
const resultModel = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  registrationNumber: {
    type: String,
  },
  courseYear: {
    type: String,
  },
  section: {
    type: String,
  },
  result: {
    type: Array,
    default: [],
  },
  attempts: {
    type: Number,
    default: 0,
  },
  points: {
    type: Number,
    default: 0,
  },
  achived: {
    type: String,
    enum: ["Passed", "Failed"],
    default: "Failed",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Check if model exists to prevent overwriting
const Result = mongoose.models.result || mongoose.model("result", resultModel)

export default Result

