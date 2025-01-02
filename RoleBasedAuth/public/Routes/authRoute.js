"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControl_1 = __importDefault(require("../controllers/authControl"));
const router = (0, express_1.Router)();
router.post('/login', authControl_1.default.loginHandler);
router.post('/register', authControl_1.default.registerHandler);
exports.default = router;
