import { Router } from "express";

import authRoutes from "@/routes/auth.routes"
import messagesRoutes from "@/routes/messages.routes";
import status from "@/routes/status.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/messages", messagesRoutes);
router.use("/status", status);

export default router;