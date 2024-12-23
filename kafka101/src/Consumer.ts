import { kafka } from ".";
const group = process.argv
export async function consumer(){
    const  consumer = kafka.consumer({
        groupId:group[2]
    })
    await consumer.connect()
    console.log("consumer connected");
    
    await consumer.subscribe({topic:"rider-updates",fromBeginning:true})
    await consumer.run({
        eachMessage: async({topic,partition,message,heartbeat,pause})=>{
            console.log(`{${group}}[${topic}]: part:${partition} :${message.value?.toString()}`);
            
        }
    })
} 

consumer()