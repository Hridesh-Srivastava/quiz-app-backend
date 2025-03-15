import { Router } from "express";
const router = Router();

import * as controller from '../controllers/controller.js';
import * as userController from "../controllers/userController.js"
/* Questions Routes API */

/* GET,POST,DELETE Request */
router.route('/questions')
        .get(controller.getQuestions) 
        .post(controller.insertQuestions) 
        .delete(controller.dropQuestions) 

router.route('/result')
        .get(controller.getResult)
        .post(controller.storeResult)
        .delete(controller.dropResult)

/* User Routes API */
router.route("/user").post(userController.createUser)

router.route("/user/:registrationNumber").get(userController.getUser)

export default router;