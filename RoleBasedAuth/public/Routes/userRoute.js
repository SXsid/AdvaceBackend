"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const roleMiddleware_1 = __importDefault(require("../middlewares/roleMiddleware"));
const router = (0, express_1.Router)();
//allroutes
router.use(authMiddleware_1.default);
router.get("/all", (0, roleMiddleware_1.default)("admin", "user", "manager"), (req, res) => {
    res.send("hwllo form all route");
});
//adminRoute
router.get("/admin", (0, roleMiddleware_1.default)("admin"), (req, res) => {
    res.send("helo form admin route");
});
//admin and manager
router.get("/higher", (0, roleMiddleware_1.default)("admin", "manager"), (req, res) => {
    res.send("hwllo form admin adn manager route");
});
exports.default = router;
