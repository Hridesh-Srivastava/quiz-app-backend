import Questions from "../models/questionSchema.js"
import Results from "../models/resultSchema.js"
import questions, { answers } from "../database/data.js"

/** get all questions */
export async function getQuestions(req, res) {
  try {
    res.json({ questions, answers })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/** insert all questions */
export async function insertQuestions(req, res) {
  try {
    // First, clear existing questions
    await Questions.deleteMany({})

    // Insert new questions from data.js
    const result = await Questions.create({
      questions: questions,
      answers: answers,
    })

    res.json({
      msg: "Questions Synced Successfully!",
      count: questions.length,
      data: result,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/** Delete all Questions */
export async function dropQuestions(req, res) {
  try {
    await Questions.deleteMany({})
    res.json({ msg: "Questions Deleted Successfully!" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/** get all result */
export async function getResult(req, res) {
  try {
    const results = await Results.find()
    res.json(results)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/** post all result */
export async function storeResult(req, res) {
  try {
    const { username, email, registrationNumber, courseYear, section, result, attempts, points, achived } = req.body

    if (!username || !result) {
      throw new Error("Required data missing")
    }

    const newResult = await Results.create({
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

    res.json({ msg: "Result Saved Successfully!", data: newResult })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/** delete all result */
export async function dropResult(req, res) {
  try {
    await Results.deleteMany({})
    res.json({ msg: "Results Deleted Successfully!" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

