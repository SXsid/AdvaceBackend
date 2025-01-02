import {Router} from "express"
import authWare from "../middlewares/authMiddleware"
import roleAcecess from "../middlewares/roleMiddleware"
const router = Router()


//allroutes
router.use(authWare)
router.get("/all",roleAcecess("admin","user","manager"),(req,res)=>{
    res.send("hwllo form all route")
})

//adminRoute
router.get("/admin",roleAcecess("admin"),(req,res)=>{
    res.send("helo form admin route")
})
//admin and manager
router.get("/higher",roleAcecess("admin","manager"),(req,res)=>{
    res.send("hwllo form admin adn manager route")
})

export default router;
