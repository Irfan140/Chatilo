import { Router } from "express";
import * as chatController from "../controllers/chatController";

const router = Router();

// Generate response
router.post("/", chatController.handleChat);

export default router;