import express from "express"
import morgan from "morgan"
import cors from "cors"
import { config } from "dotenv"
import router from "./router/route.js"

import connect from "./database/conn.js"

// Load environment variables
config()

const app = express()
const NODE_ENV = process.env.NODE_ENV || "development"

// Configure allowed origins for CORS
const allowedOrigins = [
  "https://frontend-quiz-cqklgfrfb-hridesh-srivastavas-projects.vercel.app",
  "https://frontend-quiz-hridesh-srivastavas-projects.vercel.app",
  "https://frontend-quiz-tau.vercel.app",
  "http://localhost:5173",
  // Add a wildcard for Vercel preview deployments
  /^https:\/\/frontend-quiz.*\.vercel\.app$/,
]

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) {
      return callback(null, true)
    }

    // Check if origin is allowed
    const isAllowed = allowedOrigins.some((allowedOrigin) => {
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin)
      }
      return allowedOrigin === origin
    })

    if (isAllowed) {
      callback(null, true)
    } else {
      console.log(`Origin ${origin} not allowed by CORS, but allowing in production`)
      callback(null, true) // Allow all origins in production for now
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
}

// Middleware
app.use(morgan("tiny"))
app.use(cors(corsOptions))
app.use(express.json())

// Handle preflight requests
app.options("*", cors(corsOptions))

const port = process.env.PORT || 5001

/* routes */
app.use("/api", router)

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ status: "Quiz API is running", environment: NODE_ENV })
})

// Database connection and server start
let isConnected = false

const startServer = async () => {
  try {
    if (!isConnected) {
      await connect()
      isConnected = true
      console.log("MongoDB connected successfully!")
    }

    if (NODE_ENV !== "production") {
      app.listen(port, () => {
        console.log(`Backend server connected on http://localhost:${port}`)
      })
    }
  } catch (error) {
    console.error("Error while connecting to MongoDB:", error)
    // Don't exit in production
    if (NODE_ENV !== "production") {
      process.exit(1)
    }
  }
}

startServer()

// Handle MongoDB connection for serverless environment
app.use(async (req, res, next) => {
  if (!isConnected) {
    try {
      await connect()
      isConnected = true
    } catch (error) {
      console.error("Error connecting to database in middleware:", error)
      return res.status(500).json({ error: "Database connection failed" })
    }
  }
  next()
})

// Export for Vercel
export default app

