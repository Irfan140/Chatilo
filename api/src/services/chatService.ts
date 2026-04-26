import * as aiClient from "../clients/aiClient";

// Process user message through AI service
export async function chatService(message: string): Promise<string> {
  // Call AI service to generate response
  const response = await aiClient.generate(message);
  
  return response;
}
