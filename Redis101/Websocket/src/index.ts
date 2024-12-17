import express from "express"
import { createClient } from "redis"
import http from "http"
import { WebSocket,WebSocketServer } from "ws"
import url from "url"
const app=express()
const redisClient = createClient()


const server = http.createServer(app)


const ws = new WebSocketServer({server})
const users = new Map<WebSocket,string>()
const redisUser = new Map<string,WebSocket>()
type dataProp={
    type:"msg",
    msg:string
}
type resProp={
    userId:string,
    Problemid:string,
    status:string
}
function brodcast(data:object,userSocket:WebSocket){
    ws.clients.forEach((client)=>{
        if(client!==userSocket && client.readyState===WebSocket.OPEN){
            client.send(JSON.stringify(data))
        }
    })
}
redisClient.subscribe("problem_done",(message)=>{
    const response:resProp = JSON.parse(message)
    console.log(response);
    
    const {userId}=response
    if(userId){
        const socket = redisUser.get(userId)
        if(socket){
            socket.send(JSON.stringify({problemId:response.Problemid,status:response.status}))
        }
    }

    
})

ws.on("connection",(socket,req:{url:string})=>{
    const param= url.parse(req.url,true).query
    const userId=param.userId
    if(userId && typeof userId==="string"){
        users.set(socket,userId)
        redisUser.set(userId,socket)
        
    }else{
        console.error("error while conneteing to server check creds")
        socket.close()
    } 
    socket.on("message",(msg:string)=>{
       try{
        const userId = users.get(socket)
        const data:dataProp = JSON.parse(msg.toString())
        brodcast({user:userId,msg:data.msg},socket)
       }catch(e){
        console.error("error while parsing the data")
       }
    }) 
    socket.on("close",()=>{
        const user = users.get(socket)
        if(user){
            users.delete(socket)
            redisUser.delete(user)
        }
    }) 
    
})

async function SocketServer(){
    try{
        await redisClient.connect()

        console.log("reddis connected");
        server.listen(8000,()=>{
            console.log("socket sever is up at 8000");
            
        })
    }catch(e){
        console.log("error while connecting to redis",e);
        
    }
}
SocketServer()