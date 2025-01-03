import {Router} from "express"
import multiAuthController from "../controllers/2faController";
const router = Router()


router.post("/setup",multiAuthController.setupHandler)

router.post("/verify",multiAuthController.verifyHandler)

router.post("/reset",multiAuthController.resetHandler)






export default router;