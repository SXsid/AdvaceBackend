import { loginType } from "../Types/authTypes";
import bcrypt from "bcrypt"
import prisma from "../utils/prismaClient";

class authServices{

    static async isExist(email: string) {
        try {
            const res = await prisma.user.findFirst({
                where: { email },
            });
            return res || false; 
        } catch (e:any) {
            throw new Error("Error while checking user existence: " );
        }
    }
    
    static async register(data: loginType) {
        try {
            
            const userExist = await this.isExist(data.email);
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
    
    
    
    
    static async status(){

    }
}

export default authServices;