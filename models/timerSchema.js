import mongoose from "mongoose"

const timerSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true, // Add index for faster lookups
  },
  timeLeft: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Number,
    required: true,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // Auto-delete after 24 hours (in seconds)
  },
})

// Add compound index for better performance
timerSchema.index({ registrationNumber: 1, createdAt: 1 })

export default mongoose.model("Timer", timerSchema)

