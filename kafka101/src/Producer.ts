import { kafka } from ".";
import * as readline from "readline";
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

export async function ProducerInit() {
    const producer= kafka.producer({
        allowAutoTopicCreation:false
    })
    await producer.connect()
    console.log("producer connected");
    rl.setPrompt('enter->')
    rl.prompt()
    rl.on("line",async(line)=>{
        const data= line.split(" ")
        
        console.log(data);
        
        await producer.send({
            topic:"rider-updates",
            messages:[
                {
                    partition:data[1].toLowerCase()==="north"?0:1,
                    key:"loction-updates",
                    value:JSON.stringify({name:data[0],location:"south"})
                }
            ]
        })
        rl.prompt()
    }).on("close",async ()=> await producer.disconnect())
    
   
   
}
ProducerInit()