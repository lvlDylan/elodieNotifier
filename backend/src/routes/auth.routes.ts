import { Router} from "express";

import {rateLimits} from "@/middleware/rateLimits";

import * as authController from "@/controllers/auth.controller"

const router = Router();

router.post("/login", rateLimits, authController.login);

export default router;