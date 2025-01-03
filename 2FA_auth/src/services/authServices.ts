import { loginType } from "../Types/authTypes";
import bcrypt from "bcrypt"
import prisma from "../utils/prismaClient";
import { Request, Response } from "express";
import redisClient from "../utils/redisClient";
interface isExistProp{
    email?:string,
    id?:string
}
class authServices{

    static async isExist({email,id}:isExistProp) {
        try {
            const condtion :isExistProp={}
            if(email) condtion.email=email
            else condtion.id=id
            const res = await prisma.user.findFirst({
                where: condtion
            });
            return res || false; 
        } catch (e:any) {
            throw new Error("Error while checking user existence: " );
        }
    }
    
    static async register(data: loginType) {
        try {
            
            const userExist = await this.isExist({email:data.email});
            if (userExist) {
                return {
                    statusCode: 400,
                    success: false,
                    error: "User already exists",
                };
            }
    
           
            const hashedPassword = await bcrypt.hash(data.password, 10);
    
      
            const res = await prisma.user.create({
                data: {
                    email: data.email,
                    password: hashedPassword,
                    role: data.role 
                },
            });
    
            return {
                statusCode: 201,
                success: true,
                msg: res,
            };
        } catch (e:any) {
            return {
                statusCode: 500,
                success: false,
                error: "Internal error: "  ,
            };
        }
    }
    
    static async logout(req: Request, res: Response) {
        const id = req.user?.id;

        return new Promise<{statusCode:number,message:string,success:boolean}>((resolve, reject) => {
            req.session.destroy(async (err) => {
                if (err) {
                    console.error("Error while logging out:", err);
                    reject({ statusCode: 500, error: "Failed to log out." ,success:false});
                    return;
                }

                if (id) {
                    try {
                        await redisClient.del(`user:${id}`);
                    } catch (redisErr) {
                        console.error("Error clearing user data from Redis:", redisErr);
                        reject({ statusCode: 500, error: "Failed to clear user session from Redis.",success:false });
                        return;
                    }
                }

                res.clearCookie("connect.sid"); 
                resolve({ statusCode: 200, message: "User logged out successfully.",success:true });
            });
        });
    
}
}

export default authServices;