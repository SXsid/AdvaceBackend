import {Router} from "express"
import multiAuthController from "../controllers/2faController";
import { isAuthenticated } from "../middlewares/auth.mw";
const router = Router()

router.use(isAuthenticated)
router.post("/setup",multiAuthController.setupHandler)

router.post("/verify",multiAuthController.verifyHandler)








export default router;