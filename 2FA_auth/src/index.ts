import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/auth"
import { initPassport } from "./middlewares/passport.mw"
import { setupMiddleware } from "./middlewares/global.mw"
dotenv.config()



const app =express()
const PORT = Number(process.env.PORT) ||8080
setupMiddleware(app)
initPassport(app)
app.use("/api/auth",authRouter)



app.listen(PORT,()=>{
    console.log("server is up and running on",PORT);
    
})