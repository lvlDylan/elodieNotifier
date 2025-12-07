import {Request, Response, NextFunction} from "express";

import * as authService from "@/services/auth.service";
import {logger} from "@/utils/logger";
import {pcSocket} from "@/websocket/wsServer";
import {WebSocket} from "ws";

export async function sendMessage(req: Request, res: Response, next: NextFunction) {
    const {title, message, password} = req.body;
    try {
        if (await authService.checkPassword(password)) {
            if (!pcSocket || pcSocket.readyState !== WebSocket.OPEN)
                return res.status(503).send({succes: false, message: "Pas connecté"});

            const payload = JSON.stringify({
                title: title,
                message: message
            });

            pcSocket.send(payload);
            logger.debug("Payload sent", "Websocket")

            return res.status(200).send({success: true, message: "Message envoyé"});
        }
    } catch (err: any) {
        console.log(err);
        next(err);
    }
}