import mongoose from "mongoose"
const { Schema } = mongoose

/** result model */
const resultModel = new Schema({
    username: { type: String },
    email: { type: String },
    registrationNumber: { type: String },
    courseYear: { type: String },
    section: { type: String },
    result: { type: Array, default: [] },
    attempts: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('result', resultModel)