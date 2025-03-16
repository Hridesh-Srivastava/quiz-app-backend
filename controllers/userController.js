// import User from "../models/userSchema.js"

// /** create new user */
// export async function createUser(req, res) {
//   try {
//     const { name, email, registrationNumber, courseYear, section } = req.body

//     if (!name || !email || !registrationNumber || !courseYear || !section) {
//       return res.status(400).json({ error: "All fields are required" })
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({
//       $or: [{ email: email }, { registrationNumber: registrationNumber }],
//     })

//     if (existingUser) {
//       return res.status(400).json({
//         error: "User with this email or registration number already exists",
//       })
//     }

//     // Create new user
//     const user = await User.create({
//       name,
//       email,
//       registrationNumber,
//       courseYear,
//       section
//     })

//     res.json({
//       msg: "User registered successfully",
//       userId: user._id,
//     })
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// }

// /** get user by registration number */
// export async function getUser(req, res) {
//   try {
//     const { registrationNumber } = req.params
//     const user = await User.findOne({ registrationNumber })

//     if (!user) {
//       return res.status(404).json({ error: "User not found" })
//     }

//     res.json(user)
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// }

import User from "../models/userSchema.js";

/** create new user */
export async function createUser(req, res) {
  try {
    const { name, email, registrationNumber, courseYear, section } = req.body;

    if (!name || !email || !registrationNumber || !courseYear || !section) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate registration number format to allow alphabets and numerals
    if (!/^[a-zA-Z0-9]+$/.test(registrationNumber)) {
      return res.status(400).json({ error: "Invalid registration number format. Only alphabets and numerals are allowed." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: email }, { registrationNumber: registrationNumber }],
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User with this email or registration number already exists",
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      registrationNumber,
      courseYear,
      section,
    });

    res.json({
      msg: "User registered successfully",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}