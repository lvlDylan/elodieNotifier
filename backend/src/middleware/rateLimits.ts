import rateLimit from "express-rate-limit";

export const rateLimits = rateLimit({
    windowMs: 2 * 60 * 1000,
    limit: 10,
    message: "Too many requests, try again later",
})