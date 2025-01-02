import express from "express"
import "dotenv/config"
import authRoutes from "./Routes/authRoute"
import userRoute from "./Routes/userRoute"
const app = express()
const PORT = process.env.PORT||8080
//deseriatsation
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use('/api/user',userRoute)

app.listen(PORT,()=>{
    console.log(`server is up and running on `,PORT)
})