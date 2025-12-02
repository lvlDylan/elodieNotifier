import { Router} from "express";

import {rateLimits} from "@/middleware/rateLimits";

import * as messagesController from "@/controllers/messages.controller"

const router = Router();

router.post("/send", rateLimits, messagesController.sendMessage);

export default router;