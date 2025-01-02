import { Request,Response,NextFunction } from "express"
const roleAcecess=(...allowedRoles:string[])=>{
    return(req:Request,res:Response,next:NextFunction)=>{
        //@ts-ignore
        if(!allowedRoles.includes(req.user?.role)){
            res.send("acess dened")
        }
        else{
            next()
        }
    }
}


export default roleAcecess