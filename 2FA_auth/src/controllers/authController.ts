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
       if(req.user){
        res.status(200).send("user logged in ")
       }else{
        res.send("failed whiel loggin in")
       }

    }
    
    static async logoutHandler(req:Request,res:Response){
        try{
            const logoutResponse = await authServices.logout(req,res)
            res.status(logoutResponse.statusCode).json({
                success:logoutResponse.success,
                msg:logoutResponse.message
            })
        }catch(e){
            res.status(500).send("unable to logout")
        }

    }
    static async statusHandler(req:Request,res:Response){
       
            res.status(200).json({
                msg:"user is looged in",
                email:req.user?.email,
                is2fa:req.user?.is2fa
                
            })
       
    }
}

export default authController