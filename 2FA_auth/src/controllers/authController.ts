import { Request, Response } from "express";
import { LoginSchema, loginType } from "../Types/authTypes";
import authServices from "../services/authServices";

class authController{
    
    static async registerHandler(req:Request,res:Response){
        const data:loginType=req.body
        const {success} = LoginSchema.safeParse(data)
        if(!success) res.status(404).send("invalid inputs")
        const serviceResponse  = await authServices.register(data)
        if(serviceResponse.success){
            res.status(serviceResponse.statusCode).json({
                message: "User registered successfully",
                success:serviceResponse.success,
                
            })
        }else{
            res.status(serviceResponse.statusCode).json({
                error: serviceResponse.error,
                success:serviceResponse.success
            })
        }
        
    }
    
    static async loginHandler(req:Request,res:Response){
        console.log(req.user)
        res.send("user logged in ")

    }
    
    static async logoutHandler(req:Request,res:Response){
        res.send("hello user ")

    }
    static async statusHandler(req:Request,res:Response){
        res.send("kye re bdhwe")
    }
}

export default authController