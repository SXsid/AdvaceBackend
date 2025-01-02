import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authReqType } from "../Types/authTypes";

const prisma = new PrismaClient();

class AuthService {
    static async login(data:authReqType) {
        try {
            const user = await prisma.user.findFirst({ where: { name: data.name } });
            if (!user) return { success: false, error: "Invalid credentials" };

            const isMatch = await bcrypt.compare(data.password, user.password);
            if (!isMatch) return { success: false, error: "Invalid credentials" };
            if (!process.env.JWT_SECRET) {
                throw new Error("JWT_SECRET is not defined in environment variables");
            }

            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return { success: true, token };
        } catch (error) {
            console.error("Error in login service:", error);
            return { success: false, error: "Authentication failed" };
        }
    }

    static async register(data:authReqType) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const isExist = await prisma.user.findFirst({
                where:{
                    name:data.name
                }
            })
            if(isExist) return { success: false, error: "user already exist" };
            const user = await prisma.user.create({
                data: { ...data, password: hashedPassword },
            });

            return { success: true, user };
        } catch (error) {
            console.error("Error in register service:", error);
            return { success: false, error: "Registration failed" };
        }
    }
}

export default AuthService;
