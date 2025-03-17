// import { Router } from "express"
// const router = Router()

// import * as controller from "../controllers/controller.js"
// import * as userController from "../controllers/userController.js"
// import * as timerController from "../controllers/timerController.js"

// /* Questions Routes API */
// router
//   .route("/questions")
//   .get(controller.getQuestions)
//   .post(controller.insertQuestions)
//   .delete(controller.dropQuestions)

// /* Results Routes API */
// router.route("/result").get(controller.getResult).post(controller.storeResult).delete(controller.dropResult)

// /* User Routes API */
// router.route("/user").post(userController.createUser)
// router.route("/user/:registrationNumber").get(userController.getUser)

// /* Timer Routes API */
// router.route("/timer").post(timerController.createTimer)
// router
//   .route("/timer/:registrationNumber")
//   .get(timerController.getTimer)
//   .put(timerController.updateTimer)
//   .delete(timerController.deleteTimer)

// export default router

import { Router } from "express"
import * as controllers from "../controllers/controller.js"
import * as timerController from "../controllers/timerController.js"
import * as userController from "../controllers/userController.js"

const router = Router()

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

// User verification (sign-in) - Fixed route order
router.route("/user/verify").post(userController.verifyUser)

export default router

