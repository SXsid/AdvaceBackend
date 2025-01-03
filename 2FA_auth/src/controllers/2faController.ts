import { Request, Response } from "express";
import multiAuthServices from "../services/2faServices";
import z from "zod"
import { verifiySchema, verifiyType } from "../Types/authTypes";
class multiAuthController{
    static async setupHandler(req:Request,res:Response){
        const setupResponse = await multiAuthServices.setup(req)
        if(!setupResponse.success) {
            res.status(setupResponse.statusCode).json({
                success:setupResponse.success,
                error:setupResponse.error
        })}
        else{
            res.status(setupResponse.statusCode).json({
                success:setupResponse.success,
                url:setupResponse.url
        })
        }
    }
    static async verifyHandler(req:Request,res:Response){
        const data:verifiyType= req.body
        const {success} = verifiySchema.safeParse(data)
        if(!success) res.send("invalid inputs")
        const verifiyResponse = await multiAuthServices.verify(data.otp,req)
        if(!verifiyResponse.success){
            res.status(400).send(verifiyResponse.err)
        }else{
            res.status(200).json({
                ...verifiyResponse
            })
        }
        

    }
    
    
}

export default multiAuthController