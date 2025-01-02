"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
class AuthService {
    static async login(data) {
        try {
            const user = await prisma.user.findFirst({ where: { name: data.name } });
            if (!user)
                return { success: false, error: "Invalid credentials" };
            const isMatch = await bcrypt_1.default.compare(data.password, user.password);
            if (!isMatch)
                return { success: false, error: "Invalid credentials" };
            if (!process.env.JWT_SECRET) {
                throw new Error("JWT_SECRET is not defined in environment variables");
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return { success: true, token };
        }
        catch (error) {
            console.error("Error in login service:", error);
            return { success: false, error: "Authentication failed" };
        }
    }
    static async register(data) {
        try {
            const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
            const isExist = await prisma.user.findFirst({
                where: {
                    name: data.name
                }
            });
            if (isExist)
                return { success: false, error: "user already exist" };
            const user = await prisma.user.create({
                data: { ...data, password: hashedPassword },
            });
            return { success: true, user };
        }
        catch (error) {
            console.error("Error in register service:", error);
            return { success: false, error: "Registration failed" };
        }
    }
}
exports.default = AuthService;
