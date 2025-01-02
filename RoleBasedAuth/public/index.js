"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const authRoute_1 = __importDefault(require("./Routes/authRoute"));
const userRoute_1 = __importDefault(require("./Routes/userRoute"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
//deseriatsation
app.use(express_1.default.json());
app.use("/api/auth", authRoute_1.default);
app.use('/api/user', userRoute_1.default);
app.listen(PORT, () => {
    console.log(`server is up and running on `, PORT);
});
