import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

export default async function connect() {
  try {
    console.log("Attempting to connect to MongoDB...")
    console.log(`Connection string format: ${process.env.MONGODB_URI}/${DB_NAME}`)

    // Set mongoose options to handle deprecation warnings
    mongoose.set("strictQuery", false)

    // Connect to MongoDB with proper error handling
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000, // Timeout after 15s instead of 30s
    })

    console.log(`MongoDB connected successfully! Host: ${connectionInstance.connection.host}`)

    // Test the connection by listing collections
    const collections = await connectionInstance.connection.db.listCollections().toArray()
    console.log(
      "Available collections:",
      collections.map((c) => c.name),
    )

    return connectionInstance
  } catch (error) {
    console.error("Error while connecting to Database!", error)
    // Don't exit the process in production as it will crash the serverless function
    if (process.env.NODE_ENV !== "production") {
      process.exit(1)
    }
    throw error // Re-throw to handle in the calling function
  }
}

