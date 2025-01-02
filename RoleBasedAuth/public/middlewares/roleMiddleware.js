"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roleAcecess = (...allowedRoles) => {
    return (req, res, next) => {
        //@ts-ignore
        if (!allowedRoles.includes(req.user?.role)) {
            res.send("acess dened");
        }
        else {
            next();
        }
    };
};
exports.default = roleAcecess;
