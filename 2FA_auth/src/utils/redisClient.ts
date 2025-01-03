import {createClient} from "redis"
const redisClient = createClient()

redisClient.on("error",(e)=>console.error("redis error",e))
redisClient.on("connect",()=>console.log("redis started"))

redisClient.connect();

export default redisClient;