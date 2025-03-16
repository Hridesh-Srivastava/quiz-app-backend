import Timer from "../models/timerSchema.js"
import { QUIZ_CONFIG } from "../config/quizConfig.js"

/** get timer for a user */
export async function getTimer(req, res) {
  try {
    const { registrationNumber } = req.params

    if (!registrationNumber) {
      return res.status(400).json({ error: "Registration number is required" })
    }

    const timer = await Timer.findOne({ registrationNumber })

    if (!timer) {
      return res.status(404).json({ error: "Timer not found" })
    }

    // Calculate elapsed time since last update
    const elapsedSeconds = Math.floor((Date.now() - timer.startTime) / 1000)

    // Calculate remaining time
    const timeLeft = Math.max(0, timer.timeLeft - elapsedSeconds)

    // Update the timer with the new time
    timer.timeLeft = timeLeft
    timer.startTime = Date.now()
    await timer.save()

    res.json(timer)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/** create new timer */
export async function createTimer(req, res) {
  try {
    const { registrationNumber, timeLeft, startTime } = req.body

    if (!registrationNumber) {
      return res.status(400).json({ error: "Registration number is required" })
    }

    // Check if timer already exists
    const existingTimer = await Timer.findOne({ registrationNumber })

    if (existingTimer) {
      // Update existing timer
      existingTimer.timeLeft = timeLeft || QUIZ_CONFIG.DURATION_SECONDS
      existingTimer.startTime = startTime || Date.now()
      await existingTimer.save()
      return res.json(existingTimer)
    }

    // Create new timer
    const timer = await Timer.create({
      registrationNumber,
      timeLeft: timeLeft || QUIZ_CONFIG.DURATION_SECONDS,
      startTime: startTime || Date.now(),
    })

    res.json(timer)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/** update timer */
export async function updateTimer(req, res) {
  try {
    const { registrationNumber } = req.params
    const { timeLeft } = req.body

    if (!registrationNumber) {
      return res.status(400).json({ error: "Registration number is required" })
    }

    const timer = await Timer.findOne({ registrationNumber })

    if (!timer) {
      return res.status(404).json({ error: "Timer not found" })
    }

    timer.timeLeft = timeLeft
    timer.startTime = Date.now()
    await timer.save()

    res.json(timer)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/** delete timer */
export async function deleteTimer(req, res) {
  try {
    const { registrationNumber } = req.params

    if (!registrationNumber) {
      return res.status(400).json({ error: "Registration number is required" })
    }

    await Timer.deleteOne({ registrationNumber })

    res.json({ message: "Timer deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

