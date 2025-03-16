import { Router } from "express"
const router = Router()

import * as controller from "../controllers/controller.js"
import * as userController from "../controllers/userController.js"
import * as timerController from "../controllers/timerController.js"

/* Questions Routes API */
router
  .route("/questions")
  .get(controller.getQuestions)
  .post(controller.insertQuestions)
  .delete(controller.dropQuestions)

/* Results Routes API */
router.route("/result").get(controller.getResult).post(controller.storeResult).delete(controller.dropResult)

/* User Routes API */
router.route("/user").post(userController.createUser)
router.route("/user/:registrationNumber").get(userController.getUser)

/* Timer Routes API */
router.route("/timer").post(timerController.createTimer)
router
  .route("/timer/:registrationNumber")
  .get(timerController.getTimer)
  .put(timerController.updateTimer)
  .delete(timerController.deleteTimer)

export default router

