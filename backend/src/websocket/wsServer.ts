import {WebSocket, WebSocketServer} from "ws";
import {logger} from "@/utils/logger";
import {Server} from "http";
import {config} from "@/config/config";


export let pcSocket: WebSocket | null = null;

export function initWebSocketServer(httpServer: Server) {

    const wsServer: WebSocketServer = new WebSocketServer({server: httpServer});
    logger.info(`Websocket started on port ${config.PORT}`, "Server")

    wsServer.on("connection", (ws: WebSocket) => {
        pcSocket = ws;

        ws.on("close", () => pcSocket = null);
        ws.on("error", (error: Error) => logger.error(error.message, "Websocket"));
    });

    return wsServer;
}

