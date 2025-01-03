import { Request, Response, NextFunction } from "express";
export function isAuthenticated(req: Request ,res: Response, next: NextFunction){
    if(req.user)
        next();
    else
        res.send("invalid session") 
}
export function isAccessed(...args:string[]){
    
    return function(req: Request ,res: Response, next: NextFunction){
       
        console.log(req.user);
        
            if(req.user && args.includes(req.user.role)){
                next()
            }else{
                res.send("access denid")
            }
    }
}