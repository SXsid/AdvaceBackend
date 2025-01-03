import * as passportStrategy from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import { Express } from "express";
import authServices from "../services/authServices";
import redisClient from "../utils/redisClient";
import prisma from "../utils/prismaClient";


export function initPassport(app: Express) {
    
    app.use(passport.initialize());
    app.use(passport.session())
    app.use(passport.authenticate('session'));
    
    passport.use(new passportStrategy.Strategy(
        { usernameField: "email"}, async (email, password, done) => {
            try {
                if (!email) { done(null, false) }
                const user =await authServices.isExist(email);
            
                if (user&& user.email === email && await bcrypt.compare(password, user.password)) {
                    done(null, user);
                } else {
                    done(null, false, { message: "User or password incorrect"});
                }
            } catch (e:any) {
                done("interal error");
            }
        }));
    
        passport.serializeUser(async( user, done) => {
            await redisClient.set(`user:${user.id}`,JSON.stringify(user),{EX:3600})
            done(null, user.id);
        });
    
    
        passport.deserializeUser(async(id:string, done) => {
            try{
                const cachedUser = await redisClient.get(`user:${id}`)
                
                if(cachedUser){
                    done(null,JSON.parse(cachedUser))
                }else{
                    const user = await prisma.user.findUnique({where:{id}})
                    if(user){
                        await  redisClient.set(`user:${user.id}`,JSON.stringify(user),{EX:3600})
                    }
                    done(null,user||false)
                }
            }catch(e){
                done(e)
            }
        });

}

    

     
     