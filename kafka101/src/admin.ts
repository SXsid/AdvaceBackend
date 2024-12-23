import { kafka } from ".";

export async function adminInit() {
    const admin = kafka.admin()
    admin.connect()
    
    
    await admin.createTopics({
        topics:[
            {
                topic:"rider-updates",
                numPartitions:2
            }
        ]
    })
    
    
    await admin.disconnect()
    
    
    
}

adminInit()