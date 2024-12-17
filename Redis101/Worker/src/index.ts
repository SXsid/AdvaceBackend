//only one thsi to to that take from the que process it and return the output to pub sub
//this dosen't have to expose on the internet jst dealing with the que and excuting as the que filled
//if hte que limit exceded we can make copise on hte kuber and run a more container in it 
import {createClient} from "redis"
const redisClient = createClient()

async function SubmissionHandler(data:string){
    const {Problemid,code,language,userId}=JSON.parse(data)
    console.log({Problemid,code,language,userId});


    // computing logic to execute the code in kubernets
    console.log("computinal happing..");
    
    await new Promise(resolve=>setTimeout(resolve,3000))
    redisClient.publish("problem_done",JSON.stringify({Problemid,status:"Accepted"}))
    console.log("code exceute for the problem id:",Problemid);
    
    
}

async function startWorker() {
    try{
        await redisClient.connect()
        console.log("redis connected");
        //polling the worker til it goes off 
        while (true){
            try{
                const problem = await redisClient.brPop("problem",0)
                await SubmissionHandler(problem.element)
            }catch(e){
                console.error("error while processing submison",e)
                //we can sent back the it to queue
                //or iform user that it failed throught pub sub + websocket

            }
        }
        
    }catch(e){
        console.log("error while ocnnection to redis",e);
        
    }
    
}

startWorker()