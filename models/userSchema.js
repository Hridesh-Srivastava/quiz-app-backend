import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  courseYear: {
    type: String,
    default: "",
  },
  section: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Add compound indexes for better performance
userSchema.index({ email: 1, registrationNumber: 1 })

export default mongoose.model("User", userSchema)

