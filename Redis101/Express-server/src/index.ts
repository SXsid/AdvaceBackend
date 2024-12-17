//expose the api edpoint to client and take the input and push it in the que
import express from "express"
import {createClient} from "redis"
const app = express()
const redisClient = createClient()
redisClient.on("error",(err)=>console.error("redis error",err))
const Port = 3000
app.use(express.json())

type submitProp={
    Problemid:number,
    code:string,
    language:string
}

app.post("/submit",async(req:{body:submitProp},res)=>{
        const {Problemid,code,language}=req.body
        const userId=122 //will ectract from jwt
        
        try{
            //put in que
            await redisClient.lPush("problem",JSON.stringify({Problemid,code,language,userId}))
            //store in db with prisma logic
            res.status(200).send("Submission recived and stored")

        }catch(e){
            console.error(e)
            res.status(500).send("failed to submit the code")
        }
})


async function serverStart(){
    try{
        await redisClient.connect()
        console.log("redis connected");
        
        app.listen(Port,()=>{
            console.log(`server is up on ${Port}`);
            
        })
        
    }catch(er){
        console.log("faield to connect to redis",er);
        
    }
}
process.on("SIGINT",async()=>{
    console.log("sutiing the sever");
    await redisClient.disconnect()
    process.exit()
    
})
serverStart();