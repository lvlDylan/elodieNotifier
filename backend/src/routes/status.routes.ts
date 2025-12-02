import {Router} from "express";

import {rateLimits} from "@/middleware/rateLimits";

import * as statusController from "@/controllers/status.controller"

const router = Router();

router.get("/", rateLimits, statusController.isOnline);

export default router;