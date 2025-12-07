import {Request, Response, NextFunction} from "express";

import {logger} from "@/utils/logger";
import {AppError} from "@/utils/errors";

export function errorHandler(
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof AppError) {
        logger.warn(`[${req.method}] ${req.url} - ${err.message}`, "errorHandler");
        return res.status(err.status).json({success: false, message: err.message, code: err.status});
    }

    logger.error(`${req.method} ${req.url} - ${err.stack}`, "errorHandler");
    res.status(500).json({success: false, error: "Internal Server Error", code: 500});
}