import type { Request, Response } from "express";
import * as chatService from "../services/chatService";


// Generate chat response
export async function handleChat(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { message } = req.body;

    // Validate input
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      res.status(400).json({
        error: "Message is required and must be a non-empty string",
      });
      return;
    }

    // Call service
    const reply = await chatService.chatService(message.trim());

    // Return response
    res.json({ reply });
  } catch (error) {
    console.error("Chat error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // Handle AI service errors
    if (errorMessage.includes("AI service")) {
      res.status(503).json({ error: "AI service unavailable" });
      return;
    }

    // Handle timeout errors
    if (errorMessage.includes("timeout") || errorMessage.includes("AbortError")) {
      res.status(504).json({ error: "Request timeout" });
      return;
    }

    // Generic error
    res.status(500).json({ error: "Internal server error" });
  }
}
