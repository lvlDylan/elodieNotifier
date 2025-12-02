import {Request, Response, NextFunction} from "express";

import {pcSocket} from "@/websocket/wsServer";
import WebSocket from "ws";

export async function isOnline(req: Request, res: Response, next: NextFunction) {
    if (pcSocket && pcSocket.readyState === WebSocket.OPEN)
        return res.status(200).send({success: true, message: "Dylan est connecté"});
    else
        return res.status(503).send({success: true, message: "Dylan n'est pas connecté"});
}