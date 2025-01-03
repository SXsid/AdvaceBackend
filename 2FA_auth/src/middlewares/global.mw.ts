import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import { RedisStore } from "connect-redis";
import redisClient from "../utils/redisClient";
import {Express} from "express"


export const setupMiddleware = (app: Express) => {
    const corsOptions = {
        origin: ["http://localhost:5713"],
        credentials: true,
    };

    const redisStore = new RedisStore({
        client: redisClient,
        prefix: "session:",
    });

    app.use(bodyParser.json({ limit: "100mb" }));
    app.use(bodyParser.urlencoded({ limit: "100mb" }));
    app.use(cors(corsOptions));
    app.use(
        session({
            store: redisStore,
            secret: process.env.SESSION_SECRET || "secret",
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 60 * 60 * 1000, 
            },
        })
    );
};
