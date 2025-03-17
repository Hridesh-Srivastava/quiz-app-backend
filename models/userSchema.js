// import mongoose from "mongoose"
// const { Schema } = mongoose

// const userSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   registrationNumber: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   courseYear: {
//     type: String,
//     required: true,
//   },
//   section: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// })

// export default mongoose.model("User", userSchema)


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

