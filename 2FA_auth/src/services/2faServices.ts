import speakeasy from "speakeasy"
import prisma from "../utils/prismaClient"
import { Request } from "express"
import qrCode from "qrcode"
import redisClient from "../utils/redisClient"
import jwt from "jsonwebtoken"
class multiAuthServices{
    static async setup(req:Request){
        const secret = speakeasy.generateSecret() 
        try{
           
            await prisma.user.update({
                where:{
                    id:req.user?.id
                },
                data:{
                    is2fa:true,
                    secret_2fa:secret.base32
                    
                }
            })
            const updatedData = {
                ...req.user,  
                is2fa: true,
                secret_2fa: secret.base32,  
            }
            await redisClient.set(
                `user:${req.user?.id}`,
                JSON.stringify(updatedData),
                { EX: 3600 }  
            );
           

        }catch(e){
            return {statusCode:500,error:"2fa failed",success:false}
        }
        const url = speakeasy.otpauthURL({
            secret:secret.base32,
            encoding:"base32",
            label:`${req.user?.email}`,
            issuer:"contact.sidshekhar@gmail.com",

        })
        const QrUrl= await qrCode.toDataURL(url)
        
        return {statusCode:500,url:QrUrl,success:true}
    }


    static async verify(otp:string,req:Request){
        if(!req.user?.secret_2fa) return {success:false,err:"plzz verfiy first"}
       
        
        const verified = speakeasy.totp.verify({
            secret:req.user?.secret_2fa,
            encoding:"base32",
            token:otp
            

        })
       
        
        if(verified){
            if(!process.env.JWT_SECRET){
                throw new Error("plzz define the jwtsceret")
            }
            const token = jwt.sign({email:req.user.email, role:req.user.role},process.env.JWT_SECRET)

            return {success:true,msg:"2fa succesd",token}
        }

        return {success:false,err:"2fa failed"}
    }
}

export default multiAuthServices;