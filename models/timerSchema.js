import mongoose from "mongoose"
const { Schema } = mongoose

/** timer model */
const timerSchema = new Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
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

export default mongoose.model("timer", timerSchema)

