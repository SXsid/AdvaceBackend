"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authWare = (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader) {
        if (Array.isArray(authHeader)) {
            token = authHeader[0].split(" ")[1];
        }
        else {
            token = authHeader.split(" ")[1];
        }
    }
    if (token === undefined) {
        res.status(401).send("no token auth denied");
        return;
    }
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = data;
        console.log(req.user);
    }
    catch (e) {
        res.status(400).send("token is not valid");
        return;
    }
    next();
};
exports.default = authWare;
