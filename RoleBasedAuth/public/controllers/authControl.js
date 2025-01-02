"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = __importDefault(require("../services/authService"));
const authTypes_1 = require("../Types/authTypes");
class AuthController {
    static async loginHandler(req, res) {
        const data = req.body;
        const { success } = authTypes_1.authReq.safeParse(data);
        if (!success)
            res.status(400).json({ success: false, error: "Invalid input" });
        const result = await authService_1.default.login(data);
        if (result.success) {
            res.status(200).json({ success: true, token: result.token });
        }
        else {
            res.status(401).json({ success: false, error: result.error });
        }
    }
    static async registerHandler(req, res) {
        const data = req.body;
        const { success } = authTypes_1.authReq.safeParse(data);
        if (!success)
            res.status(400).json({ success: false, error: "Invalid input" });
        const result = await authService_1.default.register(data);
        if (result.success) {
            res.status(201).json({ success: true, user: result.user });
        }
        else {
            res.status(500).json({ success: false, error: result.error });
        }
    }
}
exports.default = AuthController;
