import server from "@/app";

import {logger} from "@/utils/logger"
import {config} from "@/config/config";

server.listen(config.PORT, async () => {
    logger.info(`Server started on port ${config.PORT}`, "SERVER");
});