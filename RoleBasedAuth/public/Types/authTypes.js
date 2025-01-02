"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authReq = void 0;
const zod_1 = __importDefault(require("zod"));
exports.authReq = zod_1.default.object({
    name: zod_1.default.string(),
    password: zod_1.default.string().min(4),
    role: zod_1.default.enum(["admin", "manager", "user"])
});
