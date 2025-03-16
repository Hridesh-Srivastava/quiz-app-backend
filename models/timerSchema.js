import mongoose from "mongoose"
const { Schema } = mongoose

/** timer model */
const timerSchema = new Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  timeLeft: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Number,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Check if model exists to prevent overwriting
const Timer = mongoose.models.timer || mongoose.model("timer", timerSchema)

export default Timer

