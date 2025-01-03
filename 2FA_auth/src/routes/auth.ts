import {Router} from "express"
import authController from "../controllers/authController";
import multiStepAuth from "./2fa"
import passport from "passport";
import { isAccessed, isAuthenticated } from "../middlewares/auth.mw"
const router = Router()

router.use("/2fa",multiStepAuth)

router.post("/register",authController.registerHandler)
//passport middleware for emial and password verifiy
router.post("/login",passport.authenticate("local",{failureMessage:true}),authController.loginHandler)

router.post("/logout",isAuthenticated,isAccessed("user"),authController.logoutHandler)

router.get("/status",isAccessed("admin"),authController.statusHandler)




export default router;