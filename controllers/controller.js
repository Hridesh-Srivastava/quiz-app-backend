import Questions from "../models/questionSchema.js"
import Results from "../models/resultSchema.js"
import questions, { answers } from "../database/data.js"

/** get all questions */
export async function getQuestions(req, res) {
  try {
    res.json({ questions, answers })
  } catch (error) {
    console.error("Error in getQuestions:", error)
    res.status(500).json({ error: error.message })
  }
}

/** insert all questions */
export async function insertQuestions(req, res) {
  try {
    console.log("Starting insertQuestions function")

    // First, clear existing questions
    console.log("Deleting existing questions...")
    const deleteResult = await Questions.deleteMany({})
    console.log("Delete result:", deleteResult)

    // Insert new questions from data.js
    console.log("Creating new questions document...")
    console.log("Questions count:", questions.length)

    const result = await Questions.create({
      questions: questions,
      answers: answers,
    })

    console.log("Questions created successfully:", result._id)

    res.json({
      msg: "Questions Synced Successfully!",
      count: questions.length,
      data: result,
    })
  } catch (error) {
    console.error("Error in insertQuestions:", error)
    res.status(500).json({ error: error.message })
  }
}

/** Delete all Questions */
export async function dropQuestions(req, res) {
  try {
    await Questions.deleteMany({})
    res.json({ msg: "Questions Deleted Successfully!" })
  } catch (error) {
    console.error("Error in dropQuestions:", error)
    res.status(500).json({ error: error.message })
  }
}

/** get all result */
export async function getResult(req, res) {
  try {
    console.log("Fetching all results")
    const results = await Results.find()
    console.log(`Found ${results.length} results`)
    res.json(results)
  } catch (error) {
    console.error("Error in getResult:", error)
    res.status(500).json({ error: error.message })
  }
}

/** post all result */
export async function storeResult(req, res) {
  try {
    console.log("Storing result, received data:", JSON.stringify(req.body))

    const { username, email, registrationNumber, courseYear, section, result, attempts, points, achived } = req.body

    if (!username || !result) {
      throw new Error("Required data missing")
    }

    // Create new result document
    const newResult = new Results({
      username,
      email,
      registrationNumber,
      courseYear,
      section,
      result,
      attempts,
      points,
      achived,
    })

    // Save the result
    const savedResult = await newResult.save()
    console.log("Result saved successfully with ID:", savedResult._id)

    res.json({ msg: "Result Saved Successfully!", data: savedResult })
  } catch (error) {
    console.error("Error in storeResult:", error)
    res.status(500).json({ error: error.message })
  }
}

/** delete all result */
export async function dropResult(req, res) {
  try {
    await Results.deleteMany({})
    res.json({ msg: "Results Deleted Successfully!" })
  } catch (error) {
    console.error("Error in dropResult:", error)
    res.status(500).json({ error: error.message })
  }
}

