import mongoose from "mongoose"
import { config } from "dotenv"
config()

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/quiz"

// Improved MongoDB connection function with better error handling
async function connect() {
  try {
    console.log("Connecting to MongoDB...") 

    // Set mongoose options for better reliability
    const options = {
      serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds instead of 30
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 3, // Maintain at least 3 socket connections
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      retryWrites: true, // Retry write operations on network errors
      retryReads: true, // Retry read operations on network errors
    }

    await mongoose.connect(MONGODB_URI, options)

    // Add event listeners for connection issues
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err)
    })

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected")
    })

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected")
    })

    // Handle process termination
    process.on("SIGINT", async () => {
      await mongoose.connection.close()
      console.log("MongoDB connection closed due to app termination")
      process.exit(0)
    })

    return mongoose.connection
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}

export default connect

