import { Request, Response } from "express";
import AuthService from "../services/authService";
import { authReq, authReqType } from "../Types/authTypes";

class AuthController {
    static async loginHandler(req:Request, res:Response) {
        const data:authReqType= req.body;
        const { success } = authReq.safeParse(data);
        if (!success)  res.status(400).json({ success: false, error: "Invalid input" });

        const result = await AuthService.login(data);
        if (result.success) {
             res.status(200).json({ success: true, token: result.token });
        } else {
             res.status(401).json({ success: false, error: result.error });
        }
    }

    static async registerHandler(req:Request, res:Response) {
        const data:authReqType = req.body;
        const { success } = authReq.safeParse(data);
        if (!success)  res.status(400).json({ success: false, error: "Invalid input" });

        const result = await AuthService.register(data);
        if (result.success) {
             res.status(201).json({ success: true, user: result.user });
        } else {
             res.status(500).json({ success: false, error: result.error });
        }
    }
}

export default AuthController;
