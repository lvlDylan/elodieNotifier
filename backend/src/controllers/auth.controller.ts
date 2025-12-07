import {Request, Response, NextFunction} from "express";

import * as authService from "@/services/auth.service";

export async function login(req: Request, res: Response, next: NextFunction) {
    const { identifier, password } = req.body;
    try {
        if (await authService.login(identifier, password))
            return res.status(200).send({success: true, message: "Logged in"});
    } catch (err: any) {
        next(err);
    }
}