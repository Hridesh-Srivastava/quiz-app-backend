import User from "../models/userSchema.js"

/** get all users */
export async function getUsers(req, res) {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/** get user by id */
export async function getUser(req, res) {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/** create new user with improved duplicate checking */
export async function createUser(req, res) {
  try {
    const { username, email, registrationNumber, courseYear, section } = req.body

    if (!username || !email || !registrationNumber) {
      return res.status(400).json({ error: "Username, email, and registration number are required" })
    }

    // Check for existing user with same email or registration number
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase().trim() }, { registrationNumber: registrationNumber.trim() }],
    })

    if (existingUser) {
      // Determine which field caused the duplicate
      const duplicateField =
        existingUser.email.toLowerCase() === email.toLowerCase().trim() ? "email" : "registration number"

      return res.status(409).json({
        error: `User with this ${duplicateField} already exists`,
        field: duplicateField === "email" ? "email" : "registrationNumber",
      })
    }

    // Create new user with normalized data
    const user = await User.create({
      username,
      email: email.toLowerCase().trim(),
      registrationNumber: registrationNumber.trim(),
      courseYear: courseYear || "",
      section: section || "",
    })

    res.json(user)
  } catch (error) {
    console.error("Error creating user:", error)
    res.status(500).json({ error: error.message })
  }
}

/** verify user credentials for sign-in */
export async function verifyUser(req, res) {
  try {
    const { email, registrationNumber } = req.body

    if (!email && !registrationNumber) {
      return res.status(400).json({ error: "Email or registration number is required" })
    }

    // Create query based on provided credentials
    const query = {}
    if (email) query.email = email.toLowerCase().trim()
    if (registrationNumber) query.registrationNumber = registrationNumber.trim()

    const user = await User.findOne(query)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // Return user data for sign-in
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      registrationNumber: user.registrationNumber,
      courseYear: user.courseYear,
      section: user.section,
    })
  } catch (error) {
    console.error("Error verifying user:", error)
    res.status(500).json({ error: error.message })
  }
}

