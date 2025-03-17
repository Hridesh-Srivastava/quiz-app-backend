import { Router } from "express"
import * as controllers from "../controllers/controller.js"
import * as timerController from "../controllers/timerController.js"
import * as userController from "../controllers/userController.js"

const router = Router()

// User verification (sign-in) - Must be before /user/:id route to avoid conflict
router.post("/user/verify", userController.verifyUser)

// Questions routes
router
  .route("/questions")
  .get(controllers.getQuestions)
  .post(controllers.insertQuestions)
  .delete(controllers.dropQuestions)

// Results routes
router.route("/result").get(controllers.getResult).post(controllers.storeResult).delete(controllers.dropResult)

// Timer routes
router.route("/timer").post(timerController.createTimer)

router
  .route("/timer/:registrationNumber")
  .get(timerController.getTimer)
  .put(timerController.updateTimer)
  .delete(timerController.deleteTimer)

// User routes
router.route("/user").get(userController.getUsers).post(userController.createUser)

router.route("/user/:id").get(userController.getUser)

export default router

