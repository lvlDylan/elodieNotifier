import express, {Application} from "express";
import cors from "cors";
import helmet from "helmet";

import {config} from "@/config/config"
import {errorHandler} from "@/middleware/errorHandler";
import routes from "@/routes";
import http, {Server} from "http";
import {initWebSocketServer} from "@/websocket/wsServer";

const app: Application = express();

app.use(express.json());
app.use(cors(config.CORS_OPTIONS));
app.use(helmet());

app.use("/api", routes);

app.use(errorHandler);

const server: Server = http.createServer(app);
initWebSocketServer(server);


export default server;