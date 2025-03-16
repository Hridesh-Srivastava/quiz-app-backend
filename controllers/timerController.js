// import Timer from "../models/timerSchema.js"
// import { QUIZ_CONFIG } from "../config/quizConfig.js"

// /** get timer for a user */
// export async function getTimer(req, res) {
//   try {
//     console.log("Getting timer for user:", req.params.registrationNumber)
//     const { registrationNumber } = req.params

//     if (!registrationNumber) {
//       return res.status(400).json({ error: "Registration number is required" })
//     }

//     // Validate registration number format to prevent 404 errors with invalid IDs
//     if (!/^[a-zA-Z0-9_-]+$/.test(registrationNumber)) {
//       console.log("Invalid registration number format:", registrationNumber)
//       return res.status(400).json({ error: "Invalid registration number format" })
//     }

//     const timer = await Timer.findOne({ registrationNumber }).maxTimeMS(5000) // Add timeout for MongoDB query

//     if (!timer) {
//       console.log("Timer not found for:", registrationNumber)
//       // Return a 404 but with a proper JSON response
//       return res.status(404).json({ error: "Timer not found", registrationNumber })
//     }

//     // Calculate elapsed time since last update
//     const elapsedSeconds = Math.floor((Date.now() - timer.startTime) / 1000)

//     // Calculate remaining time
//     const timeLeft = Math.max(0, timer.timeLeft - elapsedSeconds)

//     // Update the timer with the new time
//     timer.timeLeft = timeLeft
//     timer.startTime = Date.now()
//     await timer.save()

//     console.log("Timer retrieved successfully:", timer._id)
//     res.json(timer)
//   } catch (error) {
//     console.error("Error in getTimer:", error)

//     // Check if it's a timeout error
//     if (error.name === "MongooseError" && error.message.includes("timed out")) {
//       return res.status(503).json({ error: "Database operation timed out. Please try again." })
//     }

//     res.status(500).json({ error: error.message })
//   }
// }

// /** create new timer */
// export async function createTimer(req, res) {
//   try {
//     console.log("Creating timer with data:", req.body)
//     const { registrationNumber, timeLeft, startTime } = req.body

//     if (!registrationNumber) {
//       return res.status(400).json({ error: "Registration number is required" })
//     }

//     // Validate registration number format
//     if (!/^[a-zA-Z0-9_-]+$/.test(registrationNumber)) {
//       console.log("Invalid registration number format:", registrationNumber)
//       return res.status(400).json({ error: "Invalid registration number format" })
//     }

//     // Check if timer already exists with timeout
//     const existingTimer = await Timer.findOne({ registrationNumber }).maxTimeMS(5000)

//     if (existingTimer) {
//       // Update existing timer
//       existingTimer.timeLeft = timeLeft || QUIZ_CONFIG.DURATION_SECONDS
//       existingTimer.startTime = startTime || Date.now()
//       await existingTimer.save()
//       console.log("Updated existing timer:", existingTimer._id)
//       return res.json(existingTimer)
//     }

//     // Create new timer
//     const timer = await Timer.create({
//       registrationNumber,
//       timeLeft: timeLeft || QUIZ_CONFIG.DURATION_SECONDS,
//       startTime: startTime || Date.now(),
//     })

//     console.log("Created new timer:", timer._id)
//     res.json(timer)
//   } catch (error) {
//     console.error("Error in createTimer:", error)

//     // Check if it's a timeout error
//     if (error.name === "MongooseError" && error.message.includes("timed out")) {
//       return res.status(503).json({ error: "Database operation timed out. Please try again." })
//     }

//     res.status(500).json({ error: error.message })
//   }
// }

// /** update timer */
// export async function updateTimer(req, res) {
//   try {
//     console.log("Updating timer for:", req.params.registrationNumber, "with data:", req.body)
//     const { registrationNumber } = req.params
//     const { timeLeft } = req.body

//     if (!registrationNumber) {
//       return res.status(400).json({ error: "Registration number is required" })
//     }

//     // Validate registration number format
//     if (!/^[a-zA-Z0-9_-]+$/.test(registrationNumber)) {
//       console.log("Invalid registration number format:", registrationNumber)
//       return res.status(400).json({ error: "Invalid registration number format" })
//     }

//     const timer = await Timer.findOne({ registrationNumber }).maxTimeMS(5000)

//     if (!timer) {
//       console.log("Timer not found for update:", registrationNumber)
//       // Create a new timer if it doesn't exist
//       const newTimer = await Timer.create({
//         registrationNumber,
//         timeLeft: timeLeft || QUIZ_CONFIG.DURATION_SECONDS,
//         startTime: Date.now(),
//       })
//       console.log("Created new timer during update:", newTimer._id)
//       return res.json(newTimer)
//     }

//     timer.timeLeft = timeLeft
//     timer.startTime = Date.now()
//     await timer.save()

//     console.log("Timer updated successfully:", timer._id)
//     res.json(timer)
//   } catch (error) {
//     console.error("Error in updateTimer:", error)

//     // Check if it's a timeout error
//     if (error.name === "MongooseError" && error.message.includes("timed out")) {
//       return res.status(503).json({ error: "Database operation timed out. Please try again." })
//     }

//     res.status(500).json({ error: error.message })
//   }
// }

// /** delete timer */
// export async function deleteTimer(req, res) {
//   try {
//     console.log("Deleting timer for:", req.params.registrationNumber)
//     const { registrationNumber } = req.params

//     if (!registrationNumber) {
//       return res.status(400).json({ error: "Registration number is required" })
//     }

//     // Validate registration number format
//     if (!/^[a-zA-Z0-9_-]+$/.test(registrationNumber)) {
//       console.log("Invalid registration number format:", registrationNumber)
//       return res.status(400).json({ error: "Invalid registration number format" })
//     }

//     const result = await Timer.deleteOne({ registrationNumber }).maxTimeMS(5000)
//     console.log("Timer deletion result:", result)

//     res.json({ message: "Timer deleted successfully" })
//   } catch (error) {
//     console.error("Error in deleteTimer:", error)

//     // Check if it's a timeout error
//     if (error.name === "MongooseError" && error.message.includes("timed out")) {
//       return res.status(503).json({ error: "Database operation timed out. Please try again." })
//     }

//     res.status(500).json({ error: error.message })
//   }
// }

import Timer from "../models/timerSchema.js";
import { QUIZ_CONFIG } from "../config/quizConfig.js";

/** create new timer */
export async function createTimer(req, res) {
  try {
    console.log("Creating timer with data:", req.body);
    const { registrationNumber, timeLeft, startTime } = req.body;

    if (!registrationNumber) {
      return res.status(400).json({ error: "Registration number is required" });
    }

    // Validate registration number format to allow alphabets and numerals
    if (!/^[a-zA-Z0-9]+$/.test(registrationNumber)) {
      console.log("Invalid registration number format:", registrationNumber);
      return res.status(400).json({ error: "Invalid registration number format" });
    }

    // Check if timer already exists
    const existingTimer = await Timer.findOne({ registrationNumber });

    if (existingTimer) {
      // Update existing timer
      existingTimer.timeLeft = timeLeft || QUIZ_CONFIG.DURATION_SECONDS;
      existingTimer.startTime = startTime || Date.now();
      await existingTimer.save();
      console.log("Updated existing timer:", existingTimer._id);
      return res.json(existingTimer);
    }

    // Create new timer
    const newTimer = await Timer.create({
      registrationNumber,
      timeLeft: timeLeft || QUIZ_CONFIG.DURATION_SECONDS,
      startTime: startTime || Date.now(),
    });

    console.log("Created new timer:", newTimer._id);
    res.json(newTimer);
  } catch (error) {
    console.error("Error in createTimer:", error);
    res.status(500).json({ error: error.message });
  }
}

/** get timer for a user */
export async function getTimer(req, res) {
  try {
    console.log("Getting timer for user:", req.params.registrationNumber);
    const { registrationNumber } = req.params;

    if (!registrationNumber) {
      return res.status(400).json({ error: "Registration number is required" });
    }

    // Validate registration number format to allow alphabets and numerals
    if (!/^[a-zA-Z0-9]+$/.test(registrationNumber)) {
      console.log("Invalid registration number format:", registrationNumber);
      return res.status(400).json({ error: "Invalid registration number format" });
    }

    const timer = await Timer.findOne({ registrationNumber });

    if (!timer) {
      console.log("Timer not found for:", registrationNumber);
      return res.status(404).json({ error: "Timer not found", registrationNumber });
    }

    // Calculate elapsed time since last update
    const elapsedTime = Math.floor((Date.now() - timer.startTime) / 1000);
    timer.timeLeft = Math.max(timer.timeLeft - elapsedTime, 0);

    res.json(timer);
  } catch (error) {
    console.error("Error in getTimer:", error);
    res.status(500).json({ error: error.message });
  }
}

/** delete timer */
export async function deleteTimer(req, res) {
  try {
    console.log("Deleting timer for:", req.params.registrationNumber);
    const { registrationNumber } = req.params;

    if (!registrationNumber) {
      return res.status(400).json({ error: "Registration number is required" });
    }

    // Validate registration number format to allow alphabets and numerals
    if (!/^[a-zA-Z0-9]+$/.test(registrationNumber)) {
      console.log("Invalid registration number format:", registrationNumber);
      return res.status(400).json({ error: "Invalid registration number format" });
    }

    const result = await Timer.deleteOne({ registrationNumber });
    console.log("Timer deletion result:", result);

    res.json({ message: "Timer deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTimer:", error);
    res.status(500).json({ error: error.message });
  }
}