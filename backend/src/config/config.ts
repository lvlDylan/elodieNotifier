import dotenv from "dotenv";

dotenv.config();

const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS ? JSON.parse(process.env.CORS_ALLOWED_ORIGINS) : [];

const corsOptions = {
    origin: (origin: string | undefined, callback: Function) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by cors"));
        }
    },
    credentials: true
};

const port = process.env.PORT || 3000;
const DB_PATH = process.env.DB_PATH ? process.env.DB_PATH : undefined;

export const config = {
    PORT: port,
    CORS_OPTIONS: corsOptions,
    DB: {
        PATH: DB_PATH
    }
}